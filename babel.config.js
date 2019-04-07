const presets = ['module:metro-react-native-babel-preset'];

const plugins = [
    [
        require.resolve('babel-plugin-relative-path-import'),
        {
            paths: [
                {
                    "rootPathPrefix": "#screens", // `@` is the default so you can remove this if you want
                    "rootPathSuffix": "./src/screens"
                }
            ]
        }

    ]

];


module.exports = {
    presets,
    plugins
};
