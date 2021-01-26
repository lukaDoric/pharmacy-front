import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        accessToken: null,
        refreshToken: null,
        accessTokenExpiresIn: null,
        refreshTokenExpiresIn: null,
        userType: null,
        canChange: true
    },
    getters: {
        tokenString: state => {
            if (store.state.accessToken == null) {
                return '';
            } else if ('accessToken' in state.accessToken) {
                return "Bearer " + state.accessToken;
            } else {
                return '';
            }
        },


    },
    mutations: {
        setData: (state) => {
            let tokenData = loadFromSessionStorage();
            if (isTokenDataValid(tokenData)) {
                assignData(state, tokenData);
            }
        },

        logOut: state => {
            sessionStorage.clear();
            console.log("Loging out.")
            state.userType = null;
            state.accessToken = null;
            state.accessTokenExpiresIn = null;
            state.refreshToken = null;
            state.refreshTokenExpiresIn = null;
            state.canChange = true;
        },



    },
    actions: {
        pushDataFromSession: ({commit,state}) => {
            commit('setData', {state});
        },
        setData: (context, tokenData) => {
            assignData(context.state, tokenData);
        },
        startSession: (context, tokenData) => {
            if(tokenData==null){
                tokenData = loadFromSessionStorage();
            }
            else {
                saveToSessionStorage(tokenData);
            }
            if (!isTokenDataValid(tokenData)) {
                context.commit('logOut');
                return;
            }
            try {
                assignData(context.state,tokenData);
                let d1 = new Date();
                let startTime = d1.getTime();
                setTimeout(function () {
                    if (context.state.userType != null &&
                        context.state.accessToken != null &&
                        Number.isInteger(context.state.accessTokenExpiresIn) &&
                        context.state.refreshToken != null &&
                        Number.isInteger(context.state.refreshTokenExpiresIn)) {
                        context.state.canChange = false;
                        let d2 = new Date();
                        if (context.state.refreshTokenExpiresIn > context.state.accessTokenExpiresIn &&
                            d2.getTime() - startTime < context.state.refreshTokenExpiresIn) {
                            axios.post('http://localhost:8080/user/refresh ', {},
                                {
                                    headers: {
                                        Authorization: 'Bearer ' + context.state.refreshToken
                                    }
                                }).then(
                                response => {
                                    context.state.canChange = true;
                                    console.log("Session is refreshed.")
                                    context.dispatch('startSession', response.data).then();
                                }
                            ).catch(err => {
                                console.log(err);
                                context.commit('logOut');
                            });
                        }
                    }
                }, context.state.accessTokenExpiresIn)
            } catch (err) {
                console.log("Error in session validation!");
                context.commit('logOut');
            }
        },

        logOut(context) {
            context.commit('logOut');
        }
    }
})

function  assignData(state, tokenData){
    state.userType = tokenData.userType;
    state.accessToken = tokenData.accessToken;
    state.accessTokenExpiresIn = parseInt(tokenData.accessTokenExpiresIn, 10);
    state.refreshToken = tokenData.refreshToken;
    state.refreshTokenExpiresIn = parseInt(tokenData.refreshTokenExpiresIn, 10);
}

function loadFromSessionStorage() {
    let tokenData = {};
    tokenData.userType = sessionStorage.getItem('userType');
    tokenData.accessToken = sessionStorage.getItem('accessToken');
    tokenData.accessTokenExpiresIn = parseInt(sessionStorage.getItem('accessTokenExpiresIn'));
    tokenData.refreshToken = sessionStorage.getItem('refreshToken');
    tokenData.refreshTokenExpiresIn = parseInt(sessionStorage.getItem('refreshTokenExpiresIn'));
    return tokenData;
}

function isTokenDataValid(tokenData) {
    if (tokenData == null) {
        return false;
    } else if (!('userType' in tokenData &&
        'accessToken' in tokenData &&
        'accessTokenExpiresIn' in tokenData &&
        'refreshToken' in tokenData &&
        'refreshTokenExpiresIn' in tokenData)) {
        return false;
    } else return !(tokenData.accessToken == null ||
        tokenData.refreshToken == null ||
        tokenData.accessTokenExpiresIn == null ||
        tokenData.refreshTokenExpiresIn == null ||
        tokenData.userType == null);
}

function saveToSessionStorage(tokenData){
    sessionStorage.setItem('userType', tokenData.userType);
    sessionStorage.setItem('accessToken', tokenData.accessToken);
    sessionStorage.setItem('accessTokenExpiresIn', tokenData.accessTokenExpiresIn);
    sessionStorage.setItem('refreshToken', tokenData.refreshToken);
    sessionStorage.setItem('refreshTokenExpiresIn', tokenData.refreshTokenExpiresIn);
}