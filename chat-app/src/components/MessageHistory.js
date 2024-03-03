import { View, Text, StyleSheet, Platform, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const MessageHistory = ({ messages, currentUser }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 10,
        margin: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.map((each, index) => {
        if (each.userId === currentUser.userId) {
          return (
            <View style={styles.myMessageContainer} key={index}>
              {each.text && (
                <Text style={styles.myMessageText}>{each.text}</Text>
              )}
              {each.image && (
                <Image source={{ uri: each.image }} style={styles.image} />
              )}
            </View>
          );
        } else {
          return (
            <View style={styles.othersMessageContainer} key={index}>
              {each.text && (
                <Text style={styles.othersMessageText}>{each.text}</Text>
              )}
              {each.image && (
                <Image source={{ uri: each.image }} style={styles.image} />
              )}
            </View>
          );
        }
      })}
    </ScrollView>
  );
};

export default MessageHistory;

const styles = StyleSheet.create({
  myMessageContainer: {
    backgroundColor: "purple",
    borderRadius: 12,
    borderBottomRightRadius: 0,
    maxWidth: "100%",
    alignSelf: "flex-end",
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  myMessageText: {
    color: "white",
    padding: 10,
    textAlign: "right",
    fontWeight: "600",
  },
  othersMessageContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderTopLeftRadius: 0,
    maxWidth: "20%",
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  othersMessageText: {
    padding: 10,
    fontWeight: "600",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    alignSelf: "center",
    marginVertical: 5,
  },
});
