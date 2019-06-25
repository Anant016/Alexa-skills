"use strict";

//import ask-sdk-core
const Alexa = require("ask-sdk-core");
//const viewportProfile = Alexa.getViewportProfile(handlerInput.requestEnvelope);
//skill name
const appName = "anu calculator";
function supportsDisplay(handlerInput) {
  var hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces
      .Display;
  return hasDisplay;
}
//code for the handlers
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    //welcome message
    let speechText = "Welcome to anu calculator, you can add 2 numbers";
    //welcome screen message
    let displayText = " Welcome to anu calculator, you can add 2 no.(s)";
    // {
    //   type: "RichText",
    //   text:
    //     "<div align='center'>Welcome to anu calculator, you can add 2 numbers</div>"
    // };

    // return handlerInput.responseBuilder
    //   .speak(speechText)
    //   .reprompt(speechText)
    //   .addDirective({
    //     type: "Alexa.Presentation.APL.RenderDocument",
    //     version: "1.0",
    //     document: require("./main.json")
    //     // datasources: {
    //     //   animalSoundData: {
    //     //     message: speechText,
    //     //     image: require("./calc.png")
    //     //   }
    //     // }
    //   })
    //   .withSimpleCard(appName, displayText)
    //   .getResponse();

    if (supportsDisplay(handlerInput)) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(appName, displayText)
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(appName, displayText)
        .addDirective({
          type: "Alexa.Presentation.APL.RenderDocument",
          version: "1.0",
          document: require("./main.json")
        })
        .getResponse();
    }
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
      displayText = `The result of ${first} plus ${second} is ${result}`;
      // {
      //   type: "RichText",
      //   text: `<div align='center'>The result of ${first} plus ${second} is ${result}</div>`
      // };

      if (supportsDisplay(handlerInput)) {
        return handlerInput.responseBuilder
          .withSimpleCard(appName, displayText)
          .speak(speechText)

          .withShouldEndSession(true)
          .getResponse();
      } else {
        return handlerInput.responseBuilder
          .withSimpleCard(appName, displayText)
          .speak(speechText)
          .addDirective({
            type: "Alexa.Presentation.APL.RenderDocument",
            version: "1.0",
            document: {
              type: "APL",
              version: "1.0",
              import: [
                {
                  name: "alexa-layouts",
                  version: "1.0.0"
                }
              ],
              mainTemplate: {
                parameters: ["payload"],
                items: [
                  {
                    when: "${viewport.shape == 'round'}",
                    type: "Container",
                    direction: "column",
                    paddingLeft: 70,
                    paddingTop: 100,
                    items: [
                      {
                        type: "Text",
                        text: `<div align='center'> The result of<br/> ${first} plus ${second}<br/> is <b>${result}</b></div>`,
                        style: "textStylePrimary2"
                      }
                    ]
                  },
                  {
                    type: "Container",
                    direction: "row",
                    paddingLeft: 0,

                    items: [
                      {
                        type: "Text",
                        text: `<div align='center'> The result of<br/> ${first} plus ${second}<br/> is ${result}</div>`,
                        style: "textStylePrimary2"
                      }
                    ]
                  }
                ]
              }
            }
          })
          .withShouldEndSession(true)
          .getResponse();
      }
      // return handlerInput.responseBuilder
      //   .withSimpleCard(appName, displayText)
      //   .speak(speechText)

      //   .withShouldEndSession(true)
      //   .getResponse();
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
    let speechText = {
      type: "RichText",
      text: "you can say add 1 and 2 or 1 plus 2"
    };

    // return handlerInput.responseBuilder
    //   .speak(speechText)
    //   .reprompt(speechText)
    //   .withSimpleCard(appName, speechText)
    //   .getResponse();
    if (
      (supportsDisplay(handlerInput) &&
        !testingOnSim &&
        viewportProfile == "HUB-LANDSCAPE-MEDIUM") ||
      (supportsDisplay(handlerInput) &&
        !testingOnSim &&
        viewportProfile == "HUB-ROUND-SMALL")
    ) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(appName, speechText)
        .addDirective({
          type: "Alexa.Presentation.APL.RenderDocument",
          version: "1.0",
          document: {
            type: "APL",
            version: "1.0",
            import: [
              {
                name: "alexa-layouts",
                version: "1.0.0"
              }
            ],
            mainTemplate: {
              parameters: ["payload"],
              items: [
                {
                  type: "RichText",
                  text: "you can say add 1 and 2 or 1 plus 2"
                }
              ]
            }
          }
        })
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(appName, speechText)
        .getResponse();
    }
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
