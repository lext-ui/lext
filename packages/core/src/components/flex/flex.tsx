import React, { type PropsWithChildren } from "react";
import { View } from "react-native";

function Flex({ children }: PropsWithChildren) {
	return <View>{children}</View>;
}

export { Flex };
