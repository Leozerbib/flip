import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:forui/forui.dart';
import '../../../../core/api/api_services.dart';
import '../../../../data/models/models.dart';
import '../widgets/banque_screen_tabs.dart';
import 'create_service_screen.dart';
import 'create_prank_screen.dart';

class BanqueScreen extends ConsumerStatefulWidget {
  const BanqueScreen({super.key});

  @override
  ConsumerState<BanqueScreen> createState() => _BanqueScreenState();
}

class _BanqueScreenState extends ConsumerState<BanqueScreen>
    with TickerProviderStateMixin {
  late TabController _tabController;

  // Data
  List<ServiceModel> _services = [];
  List<PrankModel> _pranks = [];
  List<ExecutedPrankWithDetailsModel> _executedPranks = [];
  BanqueStatsModel? _stats;
  UserBalanceModel? _balance;

  // Loading states
  bool _isLoadingServices = false;
  bool _isLoadingPranks = false;
  bool _isLoadingStats = false;

  // Pagination
  final ScrollController _servicesScrollController = ScrollController();
  final ScrollController _pranksScrollController = ScrollController();
  final ScrollController _executedPranksScrollController = ScrollController();

  bool _isLoadingMoreServices = false;
  bool _isLoadingMorePranks = false;
  bool _hasMoreServices = true;
  bool _hasMorePranks = true;

  // Search
  final TextEditingController _searchController = TextEditingController();
  bool _isSearching = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _initializeData();
    _setupScrollListeners();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _servicesScrollController.dispose();
    _pranksScrollController.dispose();
    _executedPranksScrollController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _setupScrollListeners() {
    _servicesScrollController.addListener(() {
      if (_servicesScrollController.position.pixels >=
          _servicesScrollController.position.maxScrollExtent - 200) {
        _loadMoreServices();
      }
    });

    _pranksScrollController.addListener(() {
      if (_pranksScrollController.position.pixels >=
          _pranksScrollController.position.maxScrollExtent - 200) {
        _loadMorePranks();
      }
    });
  }

  Future<void> _initializeData() async {
    setState(() => _isLoadingServices = true);
    setState(() => _isLoadingPranks = true);
    setState(() => _isLoadingStats = true);
    await Future.delayed(const Duration(milliseconds: 800));
    if (!mounted) return;

    await Future.wait([
      _loadServices(),
      _loadPranks(),
      _loadStats(),
      _loadBalance(),
    ]);
  }

  Future<void> _loadServices({int page = 1}) async {
    if (page == 1) {
      setState(() => _isLoadingServices = true);
    }

    try {
      final services = await BanqueServicesService.getServices(
        page: page,
        limit: 20,
      );

      if (services != null) {
        setState(() {
          if (page == 1) {
            _services = services;
          } else {
            _services.addAll(services);
          }
          _hasMoreServices = services.length == 20;
        });
      } else {
        // Si l'API ne retourne rien, créer quelques services de test
        setState(() {
          _services = _createMockServices();
          _hasMoreServices = false;
        });
      }
    } catch (e) {
      debugPrint('Erreur chargement services: $e');
      // En cas d'erreur, créer quelques services de test
      setState(() {
        _services = _createMockServices();
        _hasMoreServices = false;
      });
    } finally {
      setState(() {
        _isLoadingServices = false;
        _isLoadingMoreServices = false;
      });
    }
  }

  Future<void> _loadPranks({int page = 1}) async {
    if (page == 1) {
      setState(() => _isLoadingPranks = true);
    }

    try {
      final pranks = await BanquePranksService.getPranks(page: page, limit: 20);

      if (pranks != null) {
        setState(() {
          if (page == 1) {
            _pranks = pranks;
          } else {
            _pranks.addAll(pranks);
          }
          _hasMorePranks = pranks.length == 20;
        });
      } else {
        // Si l'API ne retourne rien, créer quelques pranks de test
        setState(() {
          _pranks = _createMockPranks();
          _hasMorePranks = false;
        });
      }
    } catch (e) {
      debugPrint('Erreur chargement pranks: $e');
      // En cas d'erreur, créer quelques pranks de test
      setState(() {
        _pranks = _createMockPranks();
        _hasMorePranks = false;
      });
    } finally {
      setState(() {
        _isLoadingPranks = false;
        _isLoadingMorePranks = false;
      });
    }
  }

  Future<void> _loadStats() async {
    setState(() => _isLoadingStats = true);
    try {
      final stats = await BanqueService.getDashboardStats();
      if (stats != null) {
        setState(() => _stats = stats);
      }
    } catch (e) {
      debugPrint('Erreur chargement stats: $e');
    } finally {
      setState(() => _isLoadingStats = false);
    }
  }

  Future<void> _loadBalance() async {
    try {
      final balance = await BanqueService.getUserBalance();
      if (balance != null) {
        setState(() => _balance = balance);
      }
    } catch (e) {
      debugPrint('Erreur chargement solde: $e');
    }
  }

  Future<void> _loadMoreServices() async {
    if (_isLoadingMoreServices || !_hasMoreServices) return;
    setState(() => _isLoadingMoreServices = true);

    final nextPage = (_services.length ~/ 20) + 1;
    await _loadServices(page: nextPage);
  }

  Future<void> _loadMorePranks() async {
    if (_isLoadingMorePranks || !_hasMorePranks) return;
    setState(() => _isLoadingMorePranks = true);

    final nextPage = (_pranks.length ~/ 20) + 1;
    await _loadPranks(page: nextPage);
  }

  Future<void> _onRefresh(String type) async {
    switch (type) {
      case 'services':
        await _loadServices();
        break;
      case 'pranks':
        await _loadPranks();
        break;
      case 'stats':
        await _loadStats();
        break;
    }
  }

  void _onSearchServices(String query) {
    setState(() => _isSearching = true);
    // Implémenter la recherche de services
    // Pour l'instant, on filtre localement
    setState(() => _isSearching = false);
  }

  void _onCreateService() {
    _showCreateServiceDialog();
  }

  void _onServiceAction(ServiceModel service, String action) {
    switch (action) {
      case 'confirm':
        _confirmService(service.serviceId);
        break;
      case 'repay':
        _showRepaymentOptions(service);
        break;
      case 'edit':
        _editService(service);
        break;
      case 'delete':
        _deleteService(service.serviceId);
        break;
    }
  }

  void _onPrankAction(PrankModel prank, String action) {
    switch (action) {
      case 'execute':
        _executePrank(prank);
        break;
      case 'edit':
        _editPrank(prank);
        break;
      case 'delete':
        _deletePrank(prank.prankId);
        break;
    }
  }

  Future<void> _confirmService(int serviceId) async {
    try {
      final service = await BanqueServicesService.confirmService(serviceId);
      if (service != null) {
        await _loadServices();
        _showSuccessMessage('Service confirmé avec succès');
      }
    } catch (e) {
      _showErrorMessage('Erreur lors de la confirmation');
    }
  }

  void _showRepaymentOptions(ServiceModel service) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(16),
          topRight: Radius.circular(16),
        ),
      ),
      builder: (context) => _buildRepaymentOptionsSheet(service),
    );
  }

  void _showCreateServiceDialog() async {
    final result = await Navigator.of(context).push(
      MaterialPageRoute(builder: (context) => const CreateServiceScreen()),
    );

    if (result == true) {
      // Rafraîchir les données si un service a été créé
      await _loadServices();
    }
  }

  Widget _buildRepaymentOptionsSheet(ServiceModel service) {
    final theme = FTheme.of(context);

    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Rembourser le service',
            style: theme.typography.lg.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colors.foreground,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Comment souhaitez-vous rembourser ce service ?',
            style: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
          const SizedBox(height: 24),

          // Option 1: Rembourser avec un autre service
          SizedBox(
            width: double.infinity,
            child: FButton(
              style: FButtonStyle.primary,
              onPress: () {
                Navigator.of(context).pop();
                _showServiceRepaymentDialog(service);
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(FIcons.briefcase, size: 16),
                  const SizedBox(width: 8),
                  Text('Avec un autre service'),
                ],
              ),
            ),
          ),

          const SizedBox(height: 12),

          // Option 2: Rembourser avec un prank
          SizedBox(
            width: double.infinity,
            child: FButton(
              style: FButtonStyle.secondary,
              onPress: () {
                Navigator.of(context).pop();
                _showPrankRepaymentDialog(service);
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(FIcons.zap, size: 16),
                  const SizedBox(width: 8),
                  Text('Avec un prank'),
                ],
              ),
            ),
          ),

          const SizedBox(height: 12),

          // Annuler
          SizedBox(
            width: double.infinity,
            child: FButton(
              style: FButtonStyle.outline,
              onPress: () => Navigator.of(context).pop(),
              child: Text('Annuler'),
            ),
          ),

          const SizedBox(height: 16),
        ],
      ),
    );
  }

  void _showServiceRepaymentDialog(ServiceModel service) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Remboursement par service'),
        content: Text(
          'Vous allez rembourser le service "${service.description}" en proposant un autre service.\n\nCette fonctionnalité sera bientôt disponible.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _showPrankRepaymentDialog(ServiceModel service) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Remboursement par prank'),
        content: Text(
          'Vous allez rembourser le service "${service.description}" avec un prank.\n\nCette fonctionnalité sera bientôt disponible.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _editService(ServiceModel service) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Éditer le service'),
        content: Text(
          'Vous allez modifier le service "${service.description}".\n\nCette fonctionnalité sera bientôt disponible.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  Future<void> _deleteService(int serviceId) async {
    try {
      final success = await BanqueServicesService.deleteService(serviceId);
      if (success) {
        await _loadServices();
        _showSuccessMessage('Service supprimé avec succès');
      }
    } catch (e) {
      _showErrorMessage('Erreur lors de la suppression');
    }
  }

  void _executePrank(PrankModel prank) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Exécuter le prank'),
        content: Text(
          'Vous allez exécuter le prank "${prank.description}" pour ${prank.defaultJetonCostEquivalent} jetons.\n\nCette fonctionnalité sera bientôt disponible.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Annuler'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _showSuccessMessage('Prank exécuté avec succès (simulation)');
            },
            child: const Text('Exécuter'),
          ),
        ],
      ),
    );
  }

  void _editPrank(PrankModel prank) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Éditer le prank'),
        content: Text(
          'Vous allez modifier le prank "${prank.description}".\n\nCette fonctionnalité sera bientôt disponible.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  Future<void> _deletePrank(int prankId) async {
    try {
      final success = await BanquePranksService.deletePrank(prankId);
      if (success) {
        await _loadPranks();
        _showSuccessMessage('Prank supprimé avec succès');
      }
    } catch (e) {
      _showErrorMessage('Erreur lors de la suppression');
    }
  }

  void _showSuccessMessage(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.green),
    );
  }

  void _showErrorMessage(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.red),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BanqueScreenTabs(
        tabController: _tabController,
        services: _services,
        pranks: _pranks,
        executedPranks: _executedPranks,
        stats: _stats,
        balance: _balance,
        isLoadingServices: _isLoadingServices,
        isLoadingPranks: _isLoadingPranks,
        isLoadingStats: _isLoadingStats,
        isSearching: _isSearching,
        isLoadingMoreServices: _isLoadingMoreServices,
        isLoadingMorePranks: _isLoadingMorePranks,
        hasMoreServices: _hasMoreServices,
        hasMorePranks: _hasMorePranks,
        searchController: _searchController,
        servicesScrollController: _servicesScrollController,
        pranksScrollController: _pranksScrollController,
        executedPranksScrollController: _executedPranksScrollController,
        onRefresh: _onRefresh,
        onSearchServices: _onSearchServices,
        onCreateService: _onCreateService,

        onServiceAction: _onServiceAction,
        onPrankAction: _onPrankAction,
      ),
    );
  }

  // Mock data pour les tests en attendant que les endpoints backend soient corrigés
  List<ServiceModel> _createMockServices() {
    return [
      ServiceModel(
        serviceId: 1,
        providerId: 1,
        clientId: 2,
        title: 'Cours de mathématiques',
        description: 'Cours particulier de mathématiques niveau lycée',
        price: 100,
        status: 'pending',
        type: 'service',
        createdAt: DateTime.now().subtract(Duration(days: 2)),
        provider: UserInfo(
          userId: 1,
          username: 'prof_math',
          level: 5,
          xpPoints: 1250,
        ),
        client: UserInfo(
          userId: 2,
          username: 'student_01',
          level: 2,
          xpPoints: 350,
        ),
      ),
      ServiceModel(
        serviceId: 2,
        providerId: 3,
        clientId: 1,
        title: 'Aide au déménagement',
        description: 'Aide pour déménager un appartement 2 pièces',
        price: 150,
        status: 'confirmed',
        type: 'service',
        createdAt: DateTime.now().subtract(Duration(days: 1)),
        confirmedAt: DateTime.now().subtract(Duration(hours: 5)),
        provider: UserInfo(
          userId: 3,
          username: 'strong_helper',
          level: 3,
          xpPoints: 750,
        ),
        client: UserInfo(
          userId: 1,
          username: 'current_user',
          level: 4,
          xpPoints: 980,
        ),
      ),
    ];
  }

  List<PrankModel> _createMockPranks() {
    return [
      PrankModel(
        prankId: 1,
        name: 'Défi danse TikTok',
        description: 'Danser sur une chanson TikTok populaire en public',
        defaultJetonCostEquivalent: 25,
        type: PrankType.externalAction,
        rarity: PrankRarity.common,
        requiresProof: true,
        isActive: true,
        createdAt: DateTime.now().subtract(Duration(days: 5)),
        xpRewardExecutor: 10,
        coinsRewardExecutor: 50,
      ),
      PrankModel(
        prankId: 2,
        name: 'Mime surprise',
        description: 'Faire le mime pendant 2 minutes dans un lieu public',
        defaultJetonCostEquivalent: 35,
        type: PrankType.externalAction,
        rarity: PrankRarity.rare,
        requiresProof: true,
        isActive: true,
        createdAt: DateTime.now().subtract(Duration(days: 3)),
        xpRewardExecutor: 15,
        coinsRewardExecutor: 75,
      ),
    ];
  }
}
