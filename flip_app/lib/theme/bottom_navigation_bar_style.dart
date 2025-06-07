import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'package:forui/forui.dart';

FBottomNavigationBarStyle bottomNavigationBarStyle({
  required FColors colors,
  required FTypography typography,
  required FStyle style,
}) => FBottomNavigationBarStyle(
  decoration: BoxDecoration(
    border: Border(top: BorderSide(color: colors.border)),
    color: colors.background,
  ),
  itemStyle: _bottomNavigationBarItemStyle(
    colors: colors,
    typography: typography,
    style: style,
  ),
  padding: const EdgeInsets.all(5),
);

FBottomNavigationBarItemStyle _bottomNavigationBarItemStyle({
  required FColors colors,
  required FTypography typography,
  required FStyle style,
}) => FBottomNavigationBarItemStyle(
  iconStyle: FWidgetStateMap({
    WidgetState.selected: IconThemeData(color: colors.primary, size: 24),
    WidgetState.any: IconThemeData(
      color: colors.disable(colors.foreground),
      size: 24,
    ),
  }),
  textStyle: FWidgetStateMap({
    WidgetState.selected: typography.base.copyWith(
      color: colors.primary,
      fontSize: 10,
    ),
    WidgetState.any: typography.base.copyWith(
      color: colors.disable(colors.foreground),
      fontSize: 10,
    ),
  }),
  tappableStyle: style.tappableStyle,
  focusedOutlineStyle: style.focusedOutlineStyle,
  padding: const EdgeInsets.all(5),
  spacing: 2,
);
