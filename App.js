import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resultText: '',
      calculationText: '',
    };
    this.operations = ['👈', '/', '*', '+', '-'];
  }

  buttonPressed = text => {
    if (text === '=') {
      return calculateResult(this.state.resultText);
    }

    this.setState(prev => ({
      resultText: prev.resultText + text,
    }));
  };

  calculateResult = () => {
    const text = this.state.resultText;
    // parse text
  };

  operate = operation => {
    console.log(operation);
    switch (operation) {
      case '👈':
        let text = this.state.resultText.split('');
        text.pop();
        this.setState({ resultText: text.join('') });
        break;
      case '/':
      case '*':
      case '+':
      case '-':
        const lastChar = this.state.resultText.slice(-1);
        if (this.operations.indexOf(lastChar) > 0) return;
        if (this.state.resultText === '') return;
        this.setState(prev => ({
          resultText: prev.resultText + operation,
        }));
    }
  };

  render() {
    let rows = [];
    const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];
    for (let i = 0; i <= 3; i++) {
      let innerRow = [];
      for (let j = 0; j < 3; j++) {
        innerRow.push(
          <TouchableOpacity
            style={styles.numberContainer}
            key={j}
            onPress={() => this.buttonPressed(nums[i][j])}
          >
            <Text>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View key={i} style={styles.row}>
          {innerRow}
        </View>
      );
    }

    let ops = [];
    for (let i = 0; i <= 4; i++) {
      ops.push(
        <TouchableOpacity
          style={styles.btn}
          key={i}
          onPress={() => this.operate(this.operations[i])}
        >
          <Text>{this.operations[i]}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputResult}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>121</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputResult: {
    flex: 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 20,
    color: 'white',
  },
  calculation: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculationText: {
    fontSize: 15,
    color: 'white',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numberContainer: {
    padding: 10,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 15,
  },
  numbers: {
    flex: 3,
    backgroundColor: 'white',
  },
  operations: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
});
