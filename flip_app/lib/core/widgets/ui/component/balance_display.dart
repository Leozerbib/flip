import 'package:flutter/material.dart';
import 'package:forui/forui.dart';

class BalanceDisplay extends StatelessWidget {
  final int jetonBalance;
  final int? coinsBalance;
  final bool showCoins;
  final bool compact;

  const BalanceDisplay({
    super.key,
    required this.jetonBalance,
    this.coinsBalance,
    this.showCoins = false,
    this.compact = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    if (compact) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Jetons
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: theme.colors.primary,
              borderRadius: BorderRadius.circular(12),
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
                  '$jetonBalance',
                  style: theme.typography.sm.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colors.primaryForeground,
                  ),
                ),
              ],
            ),
          ),

          if (showCoins && coinsBalance != null) ...[
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.amber,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(FIcons.circle, size: 14, color: Colors.white),
                  const SizedBox(width: 4),
                  Text(
                    '$coinsBalance',
                    style: theme.typography.sm.copyWith(
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      );
    }

    return FCard(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            // Jetons
            Expanded(
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: theme.colors.primary,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(
                      FIcons.zap,
                      size: 24,
                      color: theme.colors.primaryForeground,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '$jetonBalance',
                        style: theme.typography.xl.copyWith(
                          fontWeight: FontWeight.bold,
                          color: theme.colors.foreground,
                        ),
                      ),
                      Text(
                        'Jetons',
                        style: theme.typography.sm.copyWith(
                          color: theme.colors.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            if (showCoins && coinsBalance != null) ...[
              const SizedBox(width: 20),
              Expanded(
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.amber,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(FIcons.circle, size: 24, color: Colors.white),
                    ),
                    const SizedBox(width: 12),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '$coinsBalance',
                          style: theme.typography.xl.copyWith(
                            fontWeight: FontWeight.bold,
                            color: theme.colors.foreground,
                          ),
                        ),
                        Text(
                          'Coins',
                          style: theme.typography.sm.copyWith(
                            color: theme.colors.mutedForeground,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
