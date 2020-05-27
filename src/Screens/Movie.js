/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';

import { Card, Toast } from 'native-base';
import { Image, Rating, Header, Badge } from 'react-native-elements';

import LoadingScreen from '../Components/LoadingScreen'

// redux
import { connect } from 'react-redux';
import { MovieList, MovieDetails } from '../Redux/actions/MovieList';

// icons
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const Movie = (props) => {

  const [page, setPage] = useState(1);
  const [NewContent, setNewContent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getMovie(page);
    modalShow();
    // wait(500).then(() => setModalVisible(false))
  }, [getMovie, modalShow]);

  const onRefresh = React.useCallback(() => {
    props.MovieList(page);
    setRefreshing(true);

    wait(200).then(() => setRefreshing(false));
  }, [refreshing]);

  const setPageList = () => {
    setPage(page + 1);
    getMovie(page + 1);
    setModalVisible(false);
    setNewContent(false)
    if (page >= props.movie.data.total_pages) {
      setPage(1);
    }
  };

  const modalShow = () => {
    setTimeout(() => {
      Toast.show({
        text: "List movie has been updated !",
        buttonText: "Update",
        onClose: (reason) => { reason === "user" ? setPageList() : null },
        duration: 10000,
        buttonTextStyle: { color: "#fff" },
        buttonStyle: { backgroundColor: "#2196F3" },
      })
      setNewContent(true);
    }, 60000);
  };

  const getMovie = useCallback((pageList) => {
    props.MovieList(pageList);
  }, [props]);

  const MovieDetail = async data => {
    try {
      await props.MovieDetails(data)
      props.navigation.navigate('Movie Detail')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <SafeAreaView>
      <Header
        containerStyle={{
          backgroundColor: '#2196F3',
          height: 60,
          alignItems: 'center',
          paddingBottom: 20,
        }}
        placement="left"
        leftComponent={{ text: 'List Movie', style: { color: '#fff', fontSize: 16, fontFamily: 'Poppins-Regular' } }}
        rightComponent={<FontAwesome onPress={() => {
          NewContent ? setModalVisible(true) : null
        }} name='bell' size={24} color='#fff' />}
      />
      {NewContent ? <Badge
        status="warning"
        containerStyle={{ position: 'absolute', top: 20, right: 12 }}
      /> : null}
      <FlatList
        data={props.movie.data.results}
        refreshing={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        progressViewOffset={5}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        renderItem={({ item }) =>
          <Card style={styles.Card}>
            <View style={styles.poster}>
              <TouchableWithoutFeedback onPress={() => MovieDetail(item)}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }}
                  style={{ width: 100, height: 140 }}
                  PlaceholderContent={<ActivityIndicator />}
                  resizeMode="contain"
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.desc}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 5,
                  fontFamily: 'Poppins-Regular',
                }}>
                {item.original_title}
              </Text>
              <Rating
                readonly
                ratingCount={5}
                startingValue={item.vote_average / 2}
                imageSize={18}
                style={{ alignItems: 'flex-start', marginBottom: 5 }}
              />
              <Text style={styles.descText}> Popularity : {item.popularity} </Text>
              <Text style={styles.descText}> Release : {item.release_date} </Text>
            </View>
          </Card>}
      >

      </FlatList>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>List movie has been updated !</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={
                  setPageList
                }
              >
                <Text style={styles.textStyle}>Show new list movie</Text>
              </TouchableHighlight>
              <Text style={{
                marginTop: 10
              }}> or </Text>
              <TouchableHighlight
                onPress={() => setModalVisible(false)}
              >
                <Text style={{
                  marginTop: 10,
                  fontSize: 16,
                  color: '#2196F3',
                }}> Return to movie list </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  movie: state.MovieList,
  loading: state.Loading,
});

const mapDispatchToProps = {
  MovieList, MovieDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    position: 'absolute',
    bottom: 0,
    width: '90%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
  },
  Card: {
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  poster: {
    width: 120,
  },
  desc: {
    flex: 1,
    height: 140,
  },
  descText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 5,
  },
});
