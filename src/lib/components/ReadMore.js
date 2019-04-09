import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {Theme} from '#theme'

export default class ReadMore extends React.Component {
    state = {
        shouldShowReadMore: false,
        showAllText: false,
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.children.props.children !== prevProps.children.props.children) {
            setTimeout(() => {
                this.initText();
            }, 100)
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        await nextFrameAsync();

        if (!this._isMounted) {
            return;
        }

        await this.initText();
    }

    initText = async () => {
        const fullHeight = await measureHeightAsync(this._invisibleText);
        const limitedHeight = await measureHeightAsync(this._text);

        if (fullHeight > limitedHeight) {
            this.setState({ shouldShowReadMore: true }, () => {
                this.props.onReady && this.props.onReady();
            });
        } else {
            this.setState({ shouldShowReadMore: false }, () => {
                this.props.onReady && this.props.onReady();
            });
        }
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let { showAllText } = this.state;

        let { numberOfLines } = this.props;

        return (
            <View>
                <Text
                    style={styles.invisible}
                    ref={text => {
                        this._invisibleText = text;
                    }}
                >
                    {this.props.children}
                </Text>

                <Text
                    numberOfLines={!showAllText ? numberOfLines : 0}
                    ref={text => {
                        this._text = text;
                    }}
                >
                    {this.props.children}
                </Text>

                {this._maybeRenderReadMore()}
            </View>
        );
    }

    _handlePressReadMore = () => {
        this.setState({ showAllText: true });
    };

    _handlePressReadLess = () => {
        this.setState({ showAllText: false });
    };

    _maybeRenderReadMore() {
        let { shouldShowReadMore, showAllText } = this.state;

        if (shouldShowReadMore && !showAllText) {
            return (
                <Text style={styles.button} onPress={this._handlePressReadMore}>
                    Show more
                </Text>
            );
        } else if (shouldShowReadMore && showAllText) {
            return (
                <Text style={styles.button} onPress={this._handlePressReadLess}>
                    Show less
                </Text>
            );
        }
    }
}

function measureHeightAsync(component) {
    return new Promise(resolve => {
        component.measure((x, y, w, h) => {
            resolve(h);
        });
    });
}

function nextFrameAsync() {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

const styles = StyleSheet.create({
    invisible: {
        opacity: 0,
        position: "absolute"
    },
    button: {
        color: Theme.SHOW_MORE_COLOR,
        marginTop: 5
    }
});
