import 'package:flutter/material.dart';
import 'package:forui/forui.dart';
import '../../../../core/api/user_service.dart';
import '../../../../core/api/friendship_service.dart';
import '../../../../core/utils/logger.dart';
import '../../../../data/models/user_model.dart';
import '../../../../data/models/friendship_request_model.dart';

enum DialogContext { friends, receivedRequests, sentRequests, search }

class UserProfileDialog extends StatefulWidget {
  final int userId;
  final DialogContext context;
  final FriendshipRequestModel?
  friendshipRequest; // Pour les boutons accept/decline

  const UserProfileDialog({
    super.key,
    required this.userId,
    required this.context,
    this.friendshipRequest,
  });

  @override
  State<UserProfileDialog> createState() => _UserProfileDialogState();
}

class _UserProfileDialogState extends State<UserProfileDialog> {
  UserModel? _user;
  Map<String, dynamic>? _friendshipStatus;
  bool _isLoading = true;
  bool _isLoadingAction = false;

  @override
  void initState() {
    super.initState();
    _loadUserProfile();
  }

  Future<void> _loadUserProfile() async {
    setState(() => _isLoading = true);
    try {
      final user = await UserService.getUserById(widget.userId);
      // On charge le statut seulement si nécessaire
      if (widget.context == DialogContext.search) {
        final status = await FriendshipService.getFriendshipStatus(
          widget.userId,
        );
        setState(() {
          _user = user;
          _friendshipStatus = status;
        });
      } else {
        setState(() {
          _user = user;
        });
      }
    } catch (e) {
      AppLogger.error('Erreur chargement profil: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors du chargement du profil'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _sendFriendshipRequest() async {
    setState(() => _isLoadingAction = true);
    try {
      await FriendshipService.sendFriendshipRequest(widget.userId);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Demande d\'amitié envoyée'),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.pop(
          context,
          true,
        ); // Retourner true pour indiquer un changement
      }
    } catch (e) {
      AppLogger.error('Erreur envoi demande: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors de l\'envoi de la demande'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      setState(() => _isLoadingAction = false);
    }
  }

  Future<void> _removeFriend() async {
    setState(() => _isLoadingAction = true);
    try {
      await FriendshipService.removeFriend(widget.userId);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Ami supprimé'),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.pop(
          context,
          true,
        ); // Retourner true pour indiquer un changement
      }
    } catch (e) {
      AppLogger.error('Erreur suppression ami: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors de la suppression'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      setState(() => _isLoadingAction = false);
    }
  }

  Future<void> _acceptRequest() async {
    if (widget.friendshipRequest == null) return;

    setState(() => _isLoadingAction = true);
    try {
      await FriendshipService.acceptFriendshipRequest(
        widget.friendshipRequest!.friendshipId,
      );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Demande acceptée'),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.pop(context, true);
      }
    } catch (e) {
      AppLogger.error('Erreur acceptation demande: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors de l\'acceptation'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      setState(() => _isLoadingAction = false);
    }
  }

  Future<void> _declineRequest() async {
    if (widget.friendshipRequest == null) return;

    setState(() => _isLoadingAction = true);
    try {
      await FriendshipService.declineFriendshipRequest(
        widget.friendshipRequest!.friendshipId,
      );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Demande refusée'),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.pop(context, true);
      }
    } catch (e) {
      AppLogger.error('Erreur refus demande: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors du refus'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      setState(() => _isLoadingAction = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return FDialog.raw(
      builder: (context, style) => Container(
        constraints: const BoxConstraints(maxWidth: 400),
        child: _isLoading
            ? _buildLoadingContent(theme)
            : _buildProfileContent(theme),
      ),
    );
  }

  Widget _buildLoadingContent(FThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const CircularProgressIndicator(),
          const SizedBox(height: 16),
          Text(
            'Chargement du profil...',
            style: theme.typography.base.copyWith(
              color: theme.colors.foreground,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileContent(FThemeData theme) {
    if (_user == null) {
      return Container(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(FIcons.x, size: 48, color: theme.colors.destructive),
            const SizedBox(height: 16),
            Text(
              'Erreur lors du chargement du profil',
              style: theme.typography.base.copyWith(
                color: theme.colors.foreground,
              ),
            ),
            const SizedBox(height: 16),
            FButton(
              onPress: () => Navigator.pop(context),
              style: FButtonStyle.outline,
              child: const Text('Fermer'),
            ),
          ],
        ),
      );
    }

    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Avatar et nom
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              color: theme.colors.primary,
              borderRadius: BorderRadius.circular(40),
              image: _user!.profilePictureUrl != null
                  ? DecorationImage(
                      image: NetworkImage(_user!.profilePictureUrl!),
                      fit: BoxFit.cover,
                    )
                  : null,
            ),
            child: _user!.profilePictureUrl == null
                ? Icon(
                    FIcons.user,
                    color: theme.colors.primaryForeground,
                    size: 32,
                  )
                : null,
          ),
          const SizedBox(height: 16),

          Text(
            _user!.username,
            style: theme.typography.xl2.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.colors.foreground,
            ),
          ),

          const SizedBox(height: 16),

          // Informations du joueur
          FCard(
            child: Container(
              padding: const EdgeInsets.all(16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildStatColumn(
                    'Niveau',
                    _user!.level.toString(),
                    FIcons.trophy,
                    theme,
                  ),
                  _buildStatColumn(
                    'XP',
                    _user!.xpPoints.toString(),
                    FIcons.zap,
                    theme,
                  ),
                  _buildStatColumn(
                    'Coins',
                    _user!.gameCoins.toString(),
                    FIcons.coins,
                    theme,
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 24),

          // Statut d'amitié et actions
          _buildFriendshipActions(theme),

          const SizedBox(height: 16),

          // Bouton fermer
          FButton(
            onPress: () => Navigator.pop(context),
            style: FButtonStyle.outline,
            child: const Text('Fermer'),
          ),
        ],
      ),
    );
  }

  Widget _buildStatColumn(
    String label,
    String value,
    IconData icon,
    FThemeData theme,
  ) {
    return Column(
      children: [
        Icon(icon, size: 20, color: theme.colors.primary),
        const SizedBox(height: 4),
        Text(
          value,
          style: theme.typography.lg.copyWith(
            fontWeight: FontWeight.bold,
            color: theme.colors.foreground,
          ),
        ),
        Text(
          label,
          style: theme.typography.sm.copyWith(
            color: theme.colors.mutedForeground,
          ),
        ),
      ],
    );
  }

  Widget _buildFriendshipActions(FThemeData theme) {
    if (_isLoadingAction) {
      return const CircularProgressIndicator();
    }

    switch (widget.context) {
      case DialogContext.friends:
        // Déjà amis - montrer juste le statut et option de suppression
        return Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: Colors.green.withOpacity(0.1),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.green),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(FIcons.check, color: Colors.green, size: 16),
                  const SizedBox(width: 4),
                  Text(
                    'Ami',
                    style: theme.typography.sm.copyWith(color: Colors.green),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            FButton(
              onPress: _removeFriend,
              style: FButtonStyle.outline,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(FIcons.userMinus, size: 16),
                  const SizedBox(width: 8),
                  const Text('Supprimer'),
                ],
              ),
            ),
          ],
        );

      case DialogContext.receivedRequests:
        // Demandes reçues - montrer boutons accepter/refuser
        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            FButton(
              onPress: _acceptRequest,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(FIcons.check, size: 16),
                  const SizedBox(width: 8),
                  const Text('Accepter'),
                ],
              ),
            ),
            FButton(
              onPress: _declineRequest,
              style: FButtonStyle.outline,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(FIcons.x, size: 16),
                  const SizedBox(width: 8),
                  const Text('Refuser'),
                ],
              ),
            ),
          ],
        );

      case DialogContext.sentRequests:
        // Demandes envoyées - montrer juste le statut d'attente
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: Colors.orange.withOpacity(0.1),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.orange),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(FIcons.clock, color: Colors.orange, size: 16),
              const SizedBox(width: 4),
              Text(
                'En attente de réponse',
                style: theme.typography.sm.copyWith(color: Colors.orange),
              ),
            ],
          ),
        );

      case DialogContext.search:
        // Recherche - vérifier le statut et montrer l'action appropriée
        if (_friendshipStatus == null) {
          return const SizedBox.shrink();
        }

        final status = _friendshipStatus!['status'];

        if (status == 'accepted') {
          return Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.green.withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.green),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(FIcons.check, color: Colors.green, size: 16),
                const SizedBox(width: 4),
                Text(
                  'Déjà ami',
                  style: theme.typography.sm.copyWith(color: Colors.green),
                ),
              ],
            ),
          );
        } else if (status == 'pending') {
          return Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.orange.withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.orange),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(FIcons.clock, color: Colors.orange, size: 16),
                const SizedBox(width: 4),
                Text(
                  'Demande envoyée',
                  style: theme.typography.sm.copyWith(color: Colors.orange),
                ),
              ],
            ),
          );
        } else {
          // Pas d'amitié - montrer bouton ajouter
          return FButton(
            onPress: _sendFriendshipRequest,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(FIcons.userPlus, size: 16),
                const SizedBox(width: 8),
                const Text('Ajouter en ami'),
              ],
            ),
          );
        }
    }
  }
}
