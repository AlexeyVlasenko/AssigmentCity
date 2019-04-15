/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '#theme';

function measureHeightAsync(component) {
  return new Promise((resolve) => {
    component.measure((x, y, w, h) => {
      resolve(h);
    });
  });
}

function nextFrameAsync() {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

export default class ReadMore extends React.Component {
    state = {
      shouldShowReadMore: false,
      showAllText: false,
    };

    async componentDidMount() {
      this.isMounted = true;
      await nextFrameAsync();

      if (!this.isMounted) {
        return;
      }

      await this.initText();
    }

    async componentDidUpdate(prevProps) {
      const { children } = this.props;
      if (children.props.children !== prevProps.children.props.children) {
        setTimeout(() => {
          this.initText();
        }, 100);
      }
    }

    componentWillUnmount() {
      this.isMounted = false;
    }

    initText = async () => {
      const { onReady } = this.props;
      const fullHeight = await measureHeightAsync(this.invisibleText);
      const limitedHeight = await measureHeightAsync(this.text);

      if (fullHeight > limitedHeight) {
        this.setState({ shouldShowReadMore: true }, () => {
          onReady && onReady();
        });
      } else {
        this.setState({ shouldShowReadMore: false }, () => {
          onReady && onReady();
        });
      }
    };

    handlePressReadMore = () => {
      this.setState({ showAllText: true });
    };

      handlePressReadLess = () => {
        this.setState({ showAllText: false });
      };

      maybeRenderReadMore() {
        const { shouldShowReadMore, showAllText } = this.state;

        if (shouldShowReadMore && !showAllText) {
          return (
            <Text style={styles.button} onPress={this.handlePressReadMore}>
                      Show more
            </Text>
          );
        } if (shouldShowReadMore && showAllText) {
          return (
            <Text style={styles.button} onPress={this.handlePressReadLess}>
                      Show less
            </Text>
          );
        }

        return null;
      }

      render() {
        const { showAllText } = this.state;

        const { numberOfLines, children } = this.props;

        return (
          <View>
            <Text
              style={styles.invisible}
              ref={(text) => {
                this.invisibleText = text;
              }}
            >
              {children}
            </Text>

            <Text
              numberOfLines={!showAllText ? numberOfLines : 0}
              ref={(text) => {
                this.text = text;
              }}
            >
              {children}
            </Text>

            {this.maybeRenderReadMore()}
          </View>
        );
      }
}

const styles = StyleSheet.create({
  invisible: {
    opacity: 0,
    position: 'absolute',
  },
  button: {
    color: Theme.SHOW_MORE_COLOR,
    marginTop: 5,
  },
});
