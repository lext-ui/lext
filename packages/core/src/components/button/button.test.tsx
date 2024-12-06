import { fireEvent, render } from "@testing-library/react-native";
import * as React from "react";
import { Button } from "./button";

describe("Button", () => {
	it("renders correctly", () => {
		const { getByText } = render(
			<Button title="Press me" onPress={() => {}} />,
		);
		expect(getByText("Press me")).toBeTruthy();
	});

	it("calls onPress when pressed", () => {
		const onPressMock = jest.fn();
		const { getByText } = render(
			<Button title="Press me" onPress={onPressMock} />,
		);
		fireEvent.press(getByText("Press me"));
		expect(onPressMock).toHaveBeenCalledTimes(1);
	});
});
