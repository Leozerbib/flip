import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../data/models/service_model.dart';

class ServiceCard extends StatelessWidget {
  final ServiceModel service;
  final VoidCallback? onTap;
  final VoidCallback? onConfirm;
  final VoidCallback? onDelete;
  final VoidCallback? onRepay;
  final bool
  isProviderView; // true si l'utilisateur est le fournisseur, false si client

  const ServiceCard({
    super.key,
    required this.service,
    this.onTap,
    this.onConfirm,
    this.onDelete,
    this.onRepay,
    this.isProviderView = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: FCard(
        style: FCardStyle(
          decoration: BoxDecoration(
            border: Border.all(color: _getBorderColor(theme)),
            borderRadius: BorderRadius.circular(16),
          ),
          contentStyle: FCardContentStyle(
            titleTextStyle: theme.typography.base.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colors.foreground,
            ),
            subtitleTextStyle: theme.typography.sm.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
        ),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(16),
          child: Container(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeader(theme),
                const SizedBox(height: 12),
                _buildContent(theme),
                const SizedBox(height: 12),
                _buildFooter(theme),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(FThemeData theme) {
    return Row(
      children: [
        _buildTypeIcon(theme),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                service.title,
                style: theme.typography.base.copyWith(
                  fontWeight: FontWeight.w600,
                  color: theme.colors.foreground,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 4),
              Text(
                isProviderView
                    ? 'Pour: ${service.clientId}'
                    : 'De: ${service.providerId}',
                style: theme.typography.sm.copyWith(
                  color: theme.colors.mutedForeground,
                ),
              ),
            ],
          ),
        ),
        _buildStatusBadge(theme),
      ],
    );
  }

  Widget _buildTypeIcon(FThemeData theme) {
    final isPrank = service.type == 'prank';
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: isPrank
            ? Colors.orange.withOpacity(0.1)
            : theme.colors.primary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Icon(
        isPrank ? FIcons.smile : FIcons.briefcase,
        size: 20,
        color: isPrank ? Colors.orange : theme.colors.primary,
      ),
    );
  }

  Widget _buildStatusBadge(FThemeData theme) {
    final status = ServiceStatusExtension.fromString(service.status);
    Color badgeColor;
    Color textColor;
    String text;

    switch (status) {
      case ServiceStatus.pending:
        badgeColor = Colors.orange.withOpacity(0.1);
        textColor = Colors.orange;
        text = 'En attente';
        break;
      case ServiceStatus.confirmed:
        badgeColor = Colors.blue.withOpacity(0.1);
        textColor = Colors.blue;
        text = 'Confirmé';
        break;
      case ServiceStatus.completed:
        badgeColor = Colors.green.withOpacity(0.1);
        textColor = Colors.green;
        text = 'Terminé';
        break;
      case ServiceStatus.cancelled:
        badgeColor = Colors.red.withOpacity(0.1);
        textColor = Colors.red;
        text = 'Annulé';
        break;
      case ServiceStatus.repaid:
        badgeColor = Colors.purple.withOpacity(0.1);
        textColor = Colors.purple;
        text = 'Remboursé';
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: badgeColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        text,
        style: theme.typography.xs.copyWith(
          color: textColor,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  Widget _buildContent(FThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          service.description,
          style: theme.typography.sm.copyWith(color: theme.colors.foreground),
          maxLines: 3,
          overflow: TextOverflow.ellipsis,
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            Icon(FIcons.coins, size: 16, color: Colors.amber),
            const SizedBox(width: 4),
            Text(
              '${service.price} pièces',
              style: theme.typography.sm.copyWith(
                color: Colors.amber,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildFooter(FThemeData theme) {
    return Row(
      children: [
        Expanded(
          child: Text(
            _getTimeText(),
            style: theme.typography.xs.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
        ),
        ..._buildActions(theme),
      ],
    );
  }

  List<Widget> _buildActions(FThemeData theme) {
    final status = ServiceStatusExtension.fromString(service.status);
    List<Widget> actions = [];

    if (status == ServiceStatus.pending &&
        !isProviderView &&
        onConfirm != null) {
      actions.add(
        FButton(
          style: FButtonStyle.secondary,
          onPress: onConfirm,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(FIcons.check, size: 14),
              const SizedBox(width: 4),
              const Text('Confirmer'),
            ],
          ),
        ),
      );
      actions.add(const SizedBox(width: 8));
    }

    if (status == ServiceStatus.completed &&
        !isProviderView &&
        onRepay != null &&
        service.repaymentService == null) {
      actions.add(
        FButton(
          style: FButtonStyle.outline,
          onPress: onRepay,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(FIcons.rotateCcw, size: 14),
              const SizedBox(width: 4),
              const Text('Rembourser'),
            ],
          ),
        ),
      );
      actions.add(const SizedBox(width: 8));
    }

    if ((status == ServiceStatus.pending ||
            status == ServiceStatus.confirmed) &&
        onDelete != null) {
      actions.add(
        FButton(
          style: FButtonStyle.ghost,
          onPress: onDelete,
          child: Icon(FIcons.trash, size: 14, color: theme.colors.destructive),
        ),
      );
    }

    return actions;
  }

  Color _getBorderColor(FThemeData theme) {
    final status = ServiceStatusExtension.fromString(service.status);
    switch (status) {
      case ServiceStatus.pending:
        return Colors.orange;
      case ServiceStatus.confirmed:
        return Colors.blue;
      case ServiceStatus.completed:
        return Colors.green;
      case ServiceStatus.cancelled:
        return Colors.red;
      case ServiceStatus.repaid:
        return Colors.purple;
      default:
        return theme.colors.border;
    }
  }

  String _getTimeText() {
    final now = DateTime.now();
    final difference = now.difference(service.createdAt);

    if (difference.inDays > 0) {
      return 'Il y a ${difference.inDays} jour${difference.inDays > 1 ? 's' : ''}';
    } else if (difference.inHours > 0) {
      return 'Il y a ${difference.inHours} heure${difference.inHours > 1 ? 's' : ''}';
    } else if (difference.inMinutes > 0) {
      return 'Il y a ${difference.inMinutes} minute${difference.inMinutes > 1 ? 's' : ''}';
    } else {
      return 'À l\'instant';
    }
  }
}

// Widget pour état vide
class EmptyServicesWidget extends StatelessWidget {
  final ServiceType type;
  final VoidCallback? onCreatePressed;

  const EmptyServicesWidget({
    super.key,
    required this.type,
    this.onCreatePressed,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);
    final isPrank = type == ServiceType.prank;

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            isPrank ? FIcons.smile : FIcons.briefcase,
            size: 64,
            color: theme.colors.mutedForeground,
          ),
          const SizedBox(height: 16),
          Text(
            isPrank ? 'Aucun prank' : 'Aucun service',
            style: theme.typography.lg.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.colors.foreground,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            isPrank
                ? 'Vous n\'avez pas encore de pranks.\nCréez-en un pour vous amuser avec vos amis !'
                : 'Vous n\'avez pas encore de services.\nCréez-en un pour demander de l\'aide à vos amis !',
            textAlign: TextAlign.center,
            style: theme.typography.base.copyWith(
              color: theme.colors.mutedForeground,
            ),
          ),
          if (onCreatePressed != null) ...[
            const SizedBox(height: 24),
            FButton(
              onPress: onCreatePressed,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(FIcons.plus, size: 16),
                  const SizedBox(width: 8),
                  Text(isPrank ? 'Créer un prank' : 'Créer un service'),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}
