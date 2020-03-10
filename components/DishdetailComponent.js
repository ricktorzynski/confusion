import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
});

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function RenderDish(props) {

    const dish = props.dish;

    

    

    if (dish != null) {
        return (
            <Card
            featuredTitle={dish.name}
            image={{ uri: baseUrl + dish.image }}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={styles.container}>
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.toggleModal()}
                        />
                </View>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            favorites: [],
            rating: 3,
            author: '',
            comment: '',
            showModal: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleComment(dishId, rating, author, comment) {
        this.toggleModal();
        this.props.postComment(dishId, rating, author, comment);
    }

    resetForm() {
        this.setState({
            rating: 3,
            author: '',
            comment: '',
            showModal: false
        });
    }


    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    toggleModal={ () => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style={styles.modalForm}>
                        <Rating
                            showRating
                            type="star"
                            fractions={1}
                            startingValue={3}
                            imageSize={40}
                            style={{ paddingVertical: 10 }}
                            onFinishRating={ this.ratingComplete }
                        />
                        <Input
                            placeholder="Author"
                            leftIcon={{ type: 'font-awesome', name: 'user-o', marginRight: 10 }}
                            onChangeText={ author => this.setState({ author })}
                        />
                        <Input
                            placeholder="Your Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment-o', marginRight: 10 }}
                            onChangeText={ comment => this.setState({ comment })}
                        />
                    </View>
                    <View style={styles.modalView}>
                    <Button
                        onPress={() => this.handleComment(
                                dishId, 
                                this.state.userRating, 
                                this.state.author, 
                                this.state.comment
                            )
                        }
                        title="Submit"
                        color="#512DA8"
                        style={{marginTop: 10}}
                    />
                    </View>
                    <View style={styles.modalView}>
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#666"
                            title="Cancel" 
                            />
                    </View>
                    
                </Modal>
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modalForm: {
        margin: 10
    },
    modalView: {
        marginBottom: 10,
        marginLeft: 40, 
        marginRight: 40
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);