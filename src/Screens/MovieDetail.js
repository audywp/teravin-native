import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native'
import { Image, Rating } from 'react-native-elements'
import { connect } from 'react-redux'



class MovieDetail extends Component {
  render() {
    const { Detail } = this.props
    console.log(typeof Detail)
    return (
      <>
        {Detail !== null ?
          <SafeAreaView style={styles.container}>
            <View style={styles.heroImage}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/original${Detail.poster_path}` }}
                style={{
                  width: '100%', height: 290
                }}
                PlaceholderContent={<ActivityIndicator />}
                resizeMode='stretch'
              />
            </View>
            <View style={styles.Desc}>
              <View style={styles.aboutMovie}>
                <Text style={styles.FontFamily}> {Detail.overview} </Text>
              </View>
              <View style={styles.Rating}>
                <Text style={styles.FontFamily}>{Detail.original_title}</Text>
                <Rating
                  tintColor='#323846'
                  ratingBackgroundColor='#323846'
                  readonly
                  ratingCount={5}
                  startingValue={Detail.vote_average / 2}
                  imageSize={18}
                  style={{ alignItems: 'flex-start', marginBottom: 5, backgroundColor: '#323846' }}
                />
              </View>
              <View style={styles.Genre}>
                <View >
                  <Text style={styles.FontFamily}>Release</Text>
                  <Text style={styles.FontFamily}> {Detail.release_date} </Text>
                </View>
                <View>
                  <Text style={styles.FontFamily}>Popularity</Text>
                  <Text style={styles.FontFamily}>{Detail.popularity}</Text>
                </View>
                <View>
                  <Text style={styles.FontFamily}>Genre</Text>
                  <Text style={styles.FontFamily}>{Detail.adult ? '+18' : '+13'}</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
          : null}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  Detail: state.MovieList.detail
})

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    height: 290,
  },
  Desc: {
    flex: 1,
    backgroundColor: '#323846',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -20,
  },
  aboutMovie: {
  },
  Rating: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  Release: {
    backgroundColor: 'blue'
  },
  Genre: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20
  },
  FontFamily: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: 'white'
  }
});