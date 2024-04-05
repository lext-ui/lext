import { ButtonComponentProps } from "@/interfaces"
import { Pressable } from "react-native"
import { useTheme } from "@/hooks"
import Box from "@/components/mics/Box/Box"
import Group from "@/components/mics/Group/Group"
import React, { FC } from "react"
import Stack from "@/components/mics/Stack/Stack"
import Text from "@/components/typography/Text/Text"

const Button: FC<ButtonComponentProps> = ({
  label,
  description,
  gap = 5,
  left,
  right,
  variant,
  onHoverIn,
  onHoverOut,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  onBlur,
  onFocus,
  cancelable,
  delayHoverIn,
  delayHoverOut,
  delayLongPress,
  disabled,
  hitSlop,
  pressRetentionOffset,
  android_disableSound,
  android_ripple,
  testOnly_pressed,
  unstable_pressDelay,
  ...props
}) => {
  const { getComponent } = useTheme()
  const variantName = variant ?? getComponent?.Button?.defaultVariant
  const defaultProps = getComponent?.Button?.variants[variantName]

  const pressableProps = {
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    onBlur,
    onFocus,
    cancelable,
    delayHoverIn,
    delayHoverOut,
    delayLongPress,
    disabled,
    hitSlop,
    pressRetentionOffset,
    android_disableSound,
    android_ripple,
    testOnly_pressed,
    unstable_pressDelay,
  }

  const gapStyle = gap ?? defaultProps.gap
  const boxStyle = props.boxStyle ?? defaultProps?.box
  const disabledBoxStyle = props.disabledBoxStyle ?? defaultProps?.disabledBox
  const labelStyle = props.labelStyle ?? defaultProps?.label
  const descriptionStyle = props.descriptionStyle ?? defaultProps?.description

  return (
    <Pressable {...pressableProps}>
      <Box {...boxStyle} style={disabled && disabledBoxStyle}>
        <Group
          gap={gapStyle}
          justifyContent="space-between"
          alignItems="center"
        >
          {left && left}
          <Stack gap={0} alignItems="center">
            <Text {...labelStyle}>{label}</Text>
            {description && <Text {...descriptionStyle}>{description}</Text>}
          </Stack>
          {right && right}
        </Group>
      </Box>
    </Pressable>
  )
}

export default Button
