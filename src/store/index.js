import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app';

import mentor from './modules/mentor';
import MnRequest from './modules/mentorship/MnRequest';
import MnSession from './modules/mentorship/MnSession';
import Payment from './modules/payment';
import ServRequest from './modules/services/ServRequest';
import ServRequestCv from './modules/services/ServRequestCv';
import ServRequestCl from './modules/services/ServRequestCl';
import Chat from './modules/chat';

import experiance from './modules/services/cv/experiance';
import education from './modules/services/cv/education';
import contact from './modules/services/cv/contact';
import project from './modules/services/cv/project';
import reffrence from './modules/services/cv/reffrence';
import organization from './modules/services/cv/organization';
import awards from './modules/services/cv/award';
import skill from './modules/services/cv/skills';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    app,
    mentor,
    Payment,
    MnRequest,
    MnSession,
    ServRequest,
    ServRequestCv,
    ServRequestCl,
    Chat,
    experiance,
    education,
    contact,
    project,
    reffrence,
    organization,
    skill,
    awards,
  }
})
