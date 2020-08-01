import React from 'react';
import {StyleSheet} from 'react-native';
import {List, Text, Divider, Avatar, ListItem} from '@ui-kitten/components';
import PropTypes from 'prop-types';

const formatDate = (value) => {
  const date = new Date(value);
  return date.toISOString().substr(11, 5);
};

const ConversationList = ({conversations, username, navigation}) => {
  const renderItem2 = ({item}) => (
    <ListItem
      onPress={() => {
        const toUser = item.participants.filter(
          (participant) => participant.username !== username,
        )[0];
        const toUserUsername = toUser.username;
        const name = toUser.first_name + ' ' + toUser.last_name;
        navigation.navigate('Chat', {username: toUserUsername, name: name});
      }}
      title={() => (
        <Text category="h5" numberOfLines={1}>
          {item.participants
            .filter((participant) => participant.username !== username)[0]
            .first_name.trim().length > 0
            ? item.participants.filter(
                (participant) => participant.username !== username,
              )[0].first_name +
              ' ' +
              item.participants.filter(
                (participant) => participant.username !== username,
              )[0].last_name
            : item.participants.filter(
                (participant) => participant.username !== username,
              )[0].username}
        </Text>
      )}
      description={() => (
        <Text numberOfLines={1} category="p1" appearance="hint">
          {item.last_message.text}
        </Text>
      )}
      accessoryLeft={(props) => (
        <Avatar
          style={styles.avatar}
          size="giant"
          source={{
            uri:
              'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
          }}
        />
      )}
      accessoryRight={(props) => (
        <Text>{formatDate(item.last_message.created_at)}</Text>
      )}
    />
  );
  return (
    <List
      ItemSeparatorComponent={Divider}
      data={conversations}
      renderItem={renderItem2}
    />
  );
};

ConversationList.propTypes = {
  conversations: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  avatar: {
    marginRight: 10,
  },
});

export default ConversationList;
