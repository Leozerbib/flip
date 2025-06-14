import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../../data/models/models.dart';

class ServiceCard extends StatelessWidget {
  final ServiceModel service;
  final Function(String action) onAction;

  const ServiceCard({super.key, required this.service, required this.onAction});

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return FCard(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header avec statut et prix
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        service.description,
                        style: theme.typography.base.copyWith(
                          fontWeight: FontWeight.w600,
                          color: theme.colors.foreground,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      _buildStatusBadge(context),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: theme.colors.primary,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        FIcons.zap,
                        size: 14,
                        color: theme.colors.primaryForeground,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        '${service.price}',
                        style: theme.typography.sm.copyWith(
                          fontWeight: FontWeight.w600,
                          color: theme.colors.primaryForeground,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),

            const SizedBox(height: 12),

            // Informations utilisateur
            Row(
              children: [
                FAvatar(
                  size: 32,
                  image: service.provider.profilePictureUrl != null
                      ? NetworkImage(service.provider.profilePictureUrl!)
                      : const NetworkImage(''),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Prestataire: ${service.provider.username}',
                        style: theme.typography.sm.copyWith(
                          color: theme.colors.foreground,
                        ),
                      ),
                      Text(
                        'Client: ${service.client.username}',
                        style: theme.typography.xs.copyWith(
                          color: theme.colors.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),

            const SizedBox(height: 12),

            // Dates
            Row(
              children: [
                Icon(
                  FIcons.calendar,
                  size: 14,
                  color: theme.colors.mutedForeground,
                ),
                const SizedBox(width: 4),
                Flexible(
                  child: Text(
                    'Créé le ${_formatDate(service.createdAt)}',
                    style: theme.typography.xs.copyWith(
                      color: theme.colors.mutedForeground,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                if (service.confirmedAt != null) ...[
                  const SizedBox(width: 8),
                  Icon(
                    FIcons.check,
                    size: 14,
                    color: theme.colors.mutedForeground,
                  ),
                  const SizedBox(width: 4),
                  Flexible(
                    child: Text(
                      'Confirmé ${_formatDate(service.confirmedAt!)}',
                      style: theme.typography.xs.copyWith(
                        color: theme.colors.mutedForeground,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ],
            ),

            const SizedBox(height: 16),

            // Actions
            Row(children: _buildActionButtons(context)),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusBadge(BuildContext context) {
    final theme = FTheme.of(context);

    Color backgroundColor;
    Color textColor;
    String statusText;

    switch (service.status) {
      case 'pending':
        backgroundColor = theme.colors.secondary;
        textColor = theme.colors.mutedForeground;
        statusText = 'En attente';
        break;
      case 'confirmed':
        backgroundColor = Colors.blue.withOpacity(0.1);
        textColor = Colors.blue;
        statusText = 'Confirmé';
        break;
      case 'completed':
        backgroundColor = Colors.green.withOpacity(0.1);
        textColor = Colors.green;
        statusText = 'Terminé';
        break;
      case 'cancelled':
        backgroundColor = Colors.red.withOpacity(0.1);
        textColor = Colors.red;
        statusText = 'Annulé';
        break;
      case 'repaid':
        backgroundColor = Colors.purple.withOpacity(0.1);
        textColor = Colors.purple;
        statusText = 'Remboursé';
        break;
      default:
        backgroundColor = theme.colors.secondary;
        textColor = theme.colors.mutedForeground;
        statusText = 'Inconnu';
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        statusText,
        style: theme.typography.xs.copyWith(
          fontWeight: FontWeight.w500,
          color: textColor,
        ),
      ),
    );
  }

  List<Widget> _buildActionButtons(BuildContext context) {
    final theme = FTheme.of(context);
    final List<Widget> buttons = [];

    switch (service.status) {
      case 'pending':
        buttons.addAll([
          Expanded(
            child: FButton(
              style: FButtonStyle.primary,
              onPress: () => onAction('confirm'),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(FIcons.check, size: 14),
                  const SizedBox(width: 4),
                  Text('Confirmer'),
                ],
              ),
            ),
          ),
          const SizedBox(width: 8),
          FButton(
            style: FButtonStyle.outline,
            onPress: () => onAction('edit'),
            child: Icon(FIcons.settings, size: 16),
          ),
        ]);
        break;

      case 'confirmed':
        buttons.addAll([
          Expanded(
            child: FButton(
              style: FButtonStyle.secondary,
              onPress: () => onAction('repay'),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(FIcons.creditCard, size: 14),
                  const SizedBox(width: 4),
                  Text('Rembourser'),
                ],
              ),
            ),
          ),
        ]);
        break;

      case 'completed':
      case 'repaid':
        // Pas d'actions pour les services terminés
        break;

      default:
        buttons.addAll([
          Expanded(
            child: FButton(
              style: FButtonStyle.outline,
              onPress: () => onAction('edit'),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(FIcons.settings, size: 14),
                  const SizedBox(width: 4),
                  Text('Modifier'),
                ],
              ),
            ),
          ),
          const SizedBox(width: 8),
          FButton(
            style: FButtonStyle.destructive,
            onPress: () => onAction('delete'),
            child: Icon(FIcons.trash, size: 16),
          ),
        ]);
    }

    return buttons;
  }

  String _formatDate(DateTime date) {
    return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
  }
}
