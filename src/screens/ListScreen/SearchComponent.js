import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Theme } from "#theme";

// @TODO: Move to functional component
class SearchComponent extends Component {
    render() {
        const { onChangeText, value, onIconPress } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: Theme.HEADER_BG }}>
                <View style={styles.container}>
                    <Searchbar
                        style={styles.searchBar}
                        placeholder="Search Cities..."
                        onChangeText={onChangeText}
                        value={value}
                        onIconPress={onIconPress}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? 44 : 56,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    searchBar: {
        height: '80%',
        width: '90%',
        elevation: 1
    }
});


SearchComponent.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onIconPress: PropTypes.func
};


SearchComponent.defaultProps = {
    onChangeText: () => {
    },
    value: '',
    onIconPress: null
};


export default SearchComponent;
