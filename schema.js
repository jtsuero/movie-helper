const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat,
} = require('graphql');
require('dotenv').config();

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    year: {type: GraphQLInt},
    length: {type: GraphQLString},
    rating: {type: GraphQLFloat},
    poster: {type: GraphQLString},
    plot: {type: GraphQLString},
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return axios({
          method: 'GET',
          url: `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/inception`,
          headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host':
              'imdb-internet-movie-database-unofficial.p.rapidapi.com',
          },
        }).then(res => [res.data]);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
