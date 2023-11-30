import React from 'react';
// import AgendaAlert from './agendaAlert';
// import DetectAlert from './detectAlert';
// import InactivityAlert from './inactivityAlert';
// import TopicChangeAlert from './topicchangeAlert';
// import ClearChat from './clearChat';
// import DeleteTopic from './deleteTopic';
// import BasicAlert from './basicAlert';

// const PopUp = {
//   AgendaAlert: AgendaAlert,
//   DetectAlert: DetectAlert,
//   InactivityAlert: InactivityAlert,
//   TopicChangeAlert: TopicChangeAlert,
//   ClearChat: ClearChat,
//   DeleteTopic: DeleteTopic,
//   BasicAlert: BasicAlert,
// };

// export default PopUp;

// Export each popup component individually
export const AgendaAlert = require('./agendaAlert').default;
export const DetectAlert = require('./detectAlert').default;
export const InactivityAlert = require('./inactivityAlert').default;
export const TopicChangeAlert = require('./topicChangeAlert').default;
export const ClearChat = require('./clearChat').default;
export const DeleteTopic = require('./deleteTopic').default;
export const BasicAlert = require('./basicAlert').default;

