import 'package:flutter/material.dart';
import 'package:forui/forui.dart';

class SearchListView extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final Function(String) onChanged;
  final Widget child;

  const SearchListView({
    super.key,
    required this.controller,
    required this.hintText,
    required this.onChanged,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final theme = FTheme.of(context);

    return Column(
      children: [
        // Barre de recherche fixe en haut
        Container(
          padding: const EdgeInsets.all(8),
          child: TextField(
            controller: controller,
            decoration: InputDecoration(
              hintText: hintText,
              prefixIcon: Icon(
                FIcons.search,
                color: theme.colors.mutedForeground,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(color: theme.colors.border),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(color: theme.colors.primary),
              ),
            ),
            onChanged: onChanged,
            style: theme.typography.base.copyWith(
              color: theme.colors.foreground,
            ),
          ),
        ),

        // Contenu
        Expanded(child: child),
      ],
    );
  }
}
