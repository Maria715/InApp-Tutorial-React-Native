import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Animated,
  canvasSize,
  Dimensions,
  TouchableOpacity,
  Switch,
} from 'react-native';
import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'

// For Step by Step Walkthrough
import {
  copilot,
  walkthroughable,
  CopilotStep
} from 'react-native-copilot';

const App = (props) => {
  const [secondStepActive, setSecondStepActive] = useState(true);
  const [stepName, setStepName] = useState(null);
  const config = {
    accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
    accessible: ACCESSIBLE.WHEN_UNLOCKED,
    authenticateType: AUTHENTICATION_TYPE.BIOMETRICS,
  };

  const Check = async () => {
    const got = await SecureStorage.getItem("someKey", config)
    //console.log("weedad", got)
    // alert(got)

    if (got == "false") {
      //props.start();

    }
    else {
      props.start();
    }

  }
  const handleStepChange = async (step) => {

    //Handler, in case we want to handle the step change
    console.log(`Current step is: ${step.name}`);
    setStepName(step.name)

    console.log("Step siss", step.name)
    if (step.name == 'MAria2') {
      onFinish();
    }

  };
  const onFinish = async () => {


    const key = 'someKey'
    await SecureStorage.setItem(key, "false", config)



  }




  useEffect(() => {


    Check()

    //setting a function to handle the step change event
    props.copilotEvents.on('stepChange', handleStepChange);
    //To start the step by step Walk through


  }, []);


  const CustomComponent = ({ copilot }) => (

    <View {...copilot}>

      <Image
        style={styles.profilePhoto}
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/react_logo.png',
        }}
      />


    </View>
  );

  //Making a WalkthroughableText
  const WalkthroughableText = walkthroughable(Text);
  //Making a WalkthroughableImage
  const WalkthroughableImage = walkthroughable(Image);
  const Walkthroughable = walkthroughable(CustomComponent);
  // const Walkthroughable =walkthroughable();


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/*Step 1 to show the heading*/}
        <CopilotStep
          text="This is the heading with some style"
          order={1}
          name="firstUniqueKey">
          <WalkthroughableText style={styles.titleWK}>
            <Text style={styles.title}>   App Tour in React Native</Text>

          </WalkthroughableText>
        </CopilotStep>
      

        <View style={{ width: '20%' }}>
          <CopilotStep
            text="This is a hello world example!"
            order={2}
            name="Maria"
          >

            <CustomComponent />
          </CopilotStep>
        </View>

        {/*Step 3 to show the Image*/}
        <CopilotStep
          text="This is a image"
          order={3}
          name="MAria2">
          <WalkthroughableImage
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/react_logo.png',
            }}
            style={styles.profilePhoto1}
          >


          </WalkthroughableImage>



        </CopilotStep>

        {/*Step 2 to show the normal text*/}
        <View style={{}}>
        <View style={[styles.activeSwitchContainer]}>
          <CopilotStep
            active={secondStepActive}
            text="This is simple text without style"
            order={4}
            name="SecondUniqueKey">
            <WalkthroughableText style={styles.defaultText}>

              <Text>
                If you want to skip me
              </Text>
            </WalkthroughableText>
          </CopilotStep>
          <View style={{  }} />
          <Switch
            onValueChange={(secondStepActive) =>
              setSecondStepActive(secondStepActive)
            }
            value={secondStepActive}
          />
        </View>

        </View>
        {/*Button to start the walkthrough*/}
        <View style={styles.middleView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.start()}>
            <Text style={styles.buttonText}>
            Lets Start App Tour
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
//const MARGIN ="50%";

// SvgMaskPathFn = ({
//   size: Animated.valueXY,
//   position: Animated.valueXY,
//   canvasSize: {
//     x: number,
//     y: number
//   },
//   step: Step
// }) ;


// const customSvgPath = ({ position, size, canvasSize, step })=> {
//   if (step) 

//     return  `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}H${position.x._value + size.x._value}V${position.y._value + size.y._value}H${position.x._value}V${position.y._value}Z`;
//   //`M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;

//   else     //console.log(`Current step s: ${CopilotStep}`);
//   return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}H${position.x._value + size.x._value}V${position.y._value + size.y._value}H${position.x._value}V${position.y._value}Z`;
//   //`M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;



// };

// const circleSvgPath = ({ position, canvasSize,size }) =>
// {console.log(canvasSize, position, size)
// return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}H${position.x._value + size.x._value}V${position.y._value + size.y._value}H${position.x._value}V${position.y._value}Z`;
// //`M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
// }
// const WIDTH = Dimensions.get('window').width - (2 * MARGIN);
export default copilot({

  verticalOffset: 20,
  // horizontalOffset:30,
  //svgMaskPath: circleSvgPath
  //  ({
  //   size:  {
  //     x: "204",
  //     y: "204"
  //   },
  //     position:  {
  //       x: "114",
  //       y: "54"
  //     },
  //      canvasSize: {
  //     x: "432",
  //     y: "816"
  //   },

  //  })
  //,

  arrowColor: 'red',
  animated: true, // Can be true or false
  overlay: 'svg', // Can be either view or svg
  //backdropColor: "rgba(50, 50, 100, 0.9)"
  tooltipStyle: {
    //  width: WIDTH,
    // maxWidth: WIDTH,
    //  left: MARGIN,
    //  right:MARGIN
  },
})(App);

// SvgMaskPathFn = (args: {
//   size: Animated.valueXY,
//   position: Animated.valueXY,
//   canvasSize: {
//     x: number,
//     y: number
//   },
//   step: Step
// }) => string;



const styles = StyleSheet.create({
  defaultText: {
   // height: 80
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //  alignItems: 'center',
    //paddingTop: 40,
  },
  titleWK: {
    //  fontSize: 24,
    height: 100,
    textAlign: 'center',
    margin: 20,
  },
  title: {
    fontSize: 24,

    textAlign: 'center',
    margin: 20,
  },
  profilePhoto: {
    width: 60,
    height: 60,
    // borderRadius: 70,
    // marginVertical: 20,
    alignSelf: 'flex-start'
  },


  profilePhoto1: {
    width: 80,
    height: 80,
    // borderRadius: 70,
    // marginVertical: 20,
    alignSelf: 'flex-end'
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 100,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});

//if redux
//export default connect(mapStateToProps, mapDispatchToProps)(copilot()(MainDashboard));
