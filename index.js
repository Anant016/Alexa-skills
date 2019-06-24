"use strict";

//import ask-sdk-core
const Alexa = require("ask-sdk-core");

//skill name
const appName = "anu calculator";

//code for the handlers
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    //welcome message
    let speechText = "Welcome to anu, you can add 2 numbers";
    //welcome screen message
    let displayText = "Welcome to anu calculator";
    return (
      handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        // .addDirective({
        //   type: "Alexa.Presentation.APL.RenderDocument",
        //  // token: "[SkillProvidedToken]",
        //   version: "1.0",
        //   document: myDocument,
        //   datasources: {}
        // })
        .withSimpleCard(appName, displayText)
        .getResponse()
    );
  }
};

//implement custom handlers
const AddIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AddIntentAnu"
    );
  },
  handle(handlerInput) {
    let speechText = "";
    let displayText = "";
    let intent = handlerInput.requestEnvelope.request.intent;
    let first = intent.slots.first.value;
    let second = intent.slots.second.value;

    if (first && second) {
      //Perform operation
      let result = parseInt(first) + parseInt(second);
      speechText = `The result of ${first} plus ${second} is ${result}`;
      displayText = `${result}`;

      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(true)
        .getResponse();
    } else {
      //Ask for the required input
      return handlerInput.responseBuilder
        .addDelegateDirective(intent)
        .getResponse();
    }
  }
};

//end Custom handlers

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    //help text for your skill
    let speechText = "you can say add 1 and 2 or 1 plus 2";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(appName, speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    let speechText = "Goodbye";
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(appName, speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

//Lambda handler function
//Remember to add custom request handlers here
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    AddIntentHandler
  )
  .lambda();
