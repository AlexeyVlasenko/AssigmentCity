import { IconButton } from 'react-native-paper';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { citiesActions } from '../../lib/store/actionCreators';

const LikeButton = ({ cityId, likes, likeCity }) => {
  const isLiked = !!likes.find(like => like.id === cityId);

  return (
    <IconButton
      icon={isLiked ? 'favorite' : 'favorite-border'}
      size={26}
      onPress={() => likeCity(cityId)}
    />
  );
};

const mapState = ({ cities }) => ({
  likes: cities.likes,
});

const mapDispatch = (dispatch) => {
  const { likeCity } = citiesActions;

  return bindActionCreators({
    likeCity,
  }, dispatch);
};

export default connect(mapState, mapDispatch)(LikeButton);
