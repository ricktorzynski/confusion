import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, author, comment, rating) => dispatch(postComment(dishId, author, comment, rating)),
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
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments' >
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

function RenderDish(props) {

    const dish = props.dish;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                        {
                            text: 'Cancel', 
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            return true;
        }
    })

    

    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            {...panResponder.panHandlers}>
            <Card
            featuredTitle={dish.name}
            image={{uri: baseUrl + dish.image}}>
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
                        onPress={props.onComment}
                        />
                </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}

class Dishdetail extends Component {

    state = {
        author: '',
        comment: '',
        rating: 5,
        showModal: false,
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    toggleModal = () => {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
        }));
    };

    submitComment = () => {
        this.props.postComment(
            this.props.navigation.getParam('dishId', ''),
            this.state.author,
            this.state.comment,
            this.state.rating,
        );

        this.toggleModal();
        this.resetForm();
    };

    cancelSubmission = () => {
        this.toggleModal();
        this.resetForm();
    };

    resetForm() {
        this.setState({
            rating: 5,
            author: '',
            comment: '',
        });
    }


    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    onComment={this.toggleModal}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                 <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={this.toggleModal}
                    onRequestClose={this.toggleModal}>
                    <View style={styles.modalForm}>
                        <Rating
                            showRating
                            type="star"
                            fractions={0}
                            startingValue={this.state.rating}
                            imageSize={40}
                            style={{ paddingVertical: 10 }}
                            onFinishRating={(value) => this.setState({ rating: value })}
                        />
                        <Input
                            placeholder="Author"
                            leftIcon={{ type: 'font-awesome', name: 'user-o', marginRight: 10 }}
                            value={this.state.author}
                            onChangeText={(text) => this.setState({ author: text })}
                        />
                        <Input
                            placeholder="Your Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment-o', marginRight: 10 }}
                            value={this.state.comment}
                            onChangeText={(text) => this.setState({ comment: text })}
                        />
                    </View>
                    <View style={styles.modalView}>
                    <Button
                        onPress={this.submitComment}
                        title="Submit"
                        color="#512DA8"
                        style={{marginTop: 10}}
                    />
                    </View>
                    <View style={styles.modalView}>
                        <Button 
                            onPress={this.cancelSubmission}
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