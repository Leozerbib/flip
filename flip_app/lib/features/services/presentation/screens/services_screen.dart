import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../core/api/services_service.dart';
import '../../../../core/utils/logger.dart';
import '../../../../core/widgets/global_alert.dart';
import '../../../../data/models/service_model.dart';
import '../widgets/create_service_dialog.dart';
import '../widgets/service_card.dart';

class ServicesScreen extends StatefulWidget {
  const ServicesScreen({super.key});

  @override
  State<ServicesScreen> createState() => _ServicesScreenState();
}

class _ServicesScreenState extends State<ServicesScreen> {
  // Data
  List<ServiceModel> _services = [];

  // Loading states
  bool _isLoadingServices = false;

  // Pagination
  bool _isLoadingMoreServices = false;
  bool _hasMoreServices = true;
  int _servicesPage = 1;
  final int _pageSize = 20;

  // Controllers
  final ScrollController _servicesScrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _setupScrollControllers();
    _loadInitialData();
  }

  @override
  void dispose() {
    _servicesScrollController.dispose();
    super.dispose();
  }

  void _setupScrollControllers() {
    _servicesScrollController.addListener(() {
      if (_servicesScrollController.position.pixels >=
          _servicesScrollController.position.maxScrollExtent - 200) {
        _loadMoreServices();
      }
    });
  }

  Future<void> _loadInitialData() async {
    await _loadServices(isRefresh: true);
  }

  Future<void> _loadServices({bool isRefresh = false}) async {
    if (isRefresh) {
      setState(() {
        _isLoadingServices = true;
        _servicesPage = 1;
        _hasMoreServices = true;
        _services.clear();
      });
    }

    try {
      final services = await ServicesService.getUserServices(
        page: _servicesPage.toString(),
        limit: _pageSize.toString(),
      );

      if (mounted) {
        setState(() {
          final safeServices = services ?? [];
          if (isRefresh) {
            _services = safeServices;
          } else {
            _services.addAll(safeServices);
          }
          _hasMoreServices = safeServices.length == _pageSize;
          if (!isRefresh) _servicesPage++;
        });
      }
    } catch (e) {
      AppLogger.error('Erreur chargement services: $e');
      if (mounted) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Impossible de charger les services',
        );
      }
      if (mounted) {
        setState(() => _services = []);
      }
    } finally {
      if (mounted) {
        setState(() => _isLoadingServices = false);
      }
    }
  }

  Future<void> _loadMoreServices() async {
    if (_isLoadingMoreServices || !_hasMoreServices) return;

    if (mounted) {
      setState(() => _isLoadingMoreServices = true);
    }
    try {
      final services = await ServicesService.getUserServices(
        page: _servicesPage.toString(),
        limit: _pageSize.toString(),
      );

      if (mounted) {
        setState(() {
          final safeServices = services ?? [];
          _services.addAll(safeServices);
          _hasMoreServices = safeServices.length == _pageSize;
          _servicesPage++;
        });
      }
    } catch (e) {
      AppLogger.error('Erreur chargement plus de services: $e');
    } finally {
      if (mounted) {
        setState(() => _isLoadingMoreServices = false);
      }
    }
  }

  Future<void> _refresh() async {
    await _loadServices(isRefresh: true);
  }

  Future<void> _showCreateDialog() async {
    final result = await showAdaptiveDialog<bool>(
      context: context,
      builder: (context) => CreateServiceDialog(),
    );

    if (result == true) {
      // Recharger les données après création
      await _loadInitialData();
    }
  }

  Future<void> _confirmService(ServiceModel service) async {
    try {
      final success = await ServicesService.confirmService(service.serviceId);
      if (success) {
        AlertService.showSuccess(
          context,
          title: 'Service confirmé',
          subtitle: 'Le service a été confirmé avec succès',
        );
        await _loadInitialData();
      }
    } catch (e) {
      AlertService.showError(
        context,
        title: 'Erreur',
        subtitle: 'Impossible de confirmer le service',
      );
    }
  }

  Future<void> _deleteService(ServiceModel service) async {
    // Afficher dialog de confirmation
    final confirmed = await showAdaptiveDialog<bool>(
      context: context,
      builder: (context) => FDialog(
        title: const Text('Supprimer le service'),
        body: Text('Êtes-vous sûr de vouloir supprimer "${service.title}" ?'),
        actions: [
          FButton(
            style: FButtonStyle.outline,
            onPress: () => Navigator.of(context).pop(false),
            child: const Text('Annuler'),
          ),
          FButton(
            style: FButtonStyle.primary,
            onPress: () => Navigator.of(context).pop(true),
            child: const Text('Supprimer'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      try {
        final success = await ServicesService.deleteService(service.serviceId);
        if (success) {
          AlertService.showSuccess(
            context,
            title: 'Service supprimé',
            subtitle: 'Le service a été supprimé avec succès',
          );
          await _loadInitialData();
        }
      } catch (e) {
        AlertService.showError(
          context,
          title: 'Erreur',
          subtitle: 'Impossible de supprimer le service',
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Scaffold(
      backgroundColor: theme.colors.background,
      body: Column(
        children: [
          // Header avec bouton de création
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.colors.background,
              border: Border(
                bottom: BorderSide(color: theme.colors.border, width: 1),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    'Services',
                    style: theme.typography.xl.copyWith(
                      fontWeight: FontWeight.bold,
                      color: theme.colors.foreground,
                    ),
                  ),
                ),
                FButton(
                  style: FButtonStyle.primary,
                  onPress: _showCreateDialog,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(FIcons.plus, size: 16),
                      const SizedBox(width: 8),
                      const Text('Créer'),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Liste des services
          Expanded(child: _buildServicesList()),
        ],
      ),
    );
  }

  Widget _buildServicesList() {
    if (_isLoadingServices && _services.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_services.isEmpty && !_isLoadingServices) {
      return RefreshIndicator(
        onRefresh: _refresh,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: SizedBox(
            height: MediaQuery.of(context).size.height - 300,
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    FIcons.briefcase,
                    size: 64,
                    color: FTheme.of(context).colors.mutedForeground,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Aucun service',
                    style: FTheme.of(context).typography.lg.copyWith(
                      color: FTheme.of(context).colors.mutedForeground,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Créez votre premier service',
                    style: FTheme.of(context).typography.base.copyWith(
                      color: FTheme.of(context).colors.mutedForeground,
                    ),
                  ),
                  const SizedBox(height: 24),
                  FButton(
                    style: FButtonStyle.primary,
                    onPress: _showCreateDialog,
                    child: const Text('Créer un service'),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: _refresh,
      child: ListView.builder(
        controller: _servicesScrollController,
        padding: const EdgeInsets.all(16),
        itemCount: _services.length + (_hasMoreServices ? 1 : 0),
        itemBuilder: (context, index) {
          if (index == _services.length) {
            return Container(
              padding: const EdgeInsets.all(16),
              child: Center(
                child: _isLoadingMoreServices
                    ? const CircularProgressIndicator()
                    : const SizedBox.shrink(),
              ),
            );
          }

          final service = _services[index];
          // TODO: Déterminer si l'utilisateur est le fournisseur ou le client
          // Pour l'instant, on suppose qu'il peut être les deux
          final isProviderView =
              true; // À implémenter selon l'utilisateur connecté

          return ServiceCard(
            service: service,
            isProviderView: isProviderView,
            onTap: () {
              // TODO: Afficher les détails du service
            },
            onConfirm: () => _confirmService(service),
            onDelete: () => _deleteService(service),
            onRepay: () {
              // TODO: Implémenter la logique de remboursement
            },
          );
        },
      ),
    );
  }
}
