import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React from "react";

export default function KeyBoardView({ children }) {
  const ios = Platform.OS === "ios";
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ios ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
