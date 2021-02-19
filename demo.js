/*

// WARNING! The following are samples only and should not be used for actual tv watching!

new TVChannel(766, 'Zee Tamil', 2, 'General'))
new TVChannel(234, 'OTV', 7, 'General'))
new TVChannel(169, 'Qatar Today', 2, 'General'))
new TVChannel(236, 'Rotana Drama', 0, 'Arabia'))
new TVChannel(331, 'Al Jazeera Qatar', 2, 'News'))
new TVChannel(232, 'MTV Lebanon', 10, 'Music')
new TVChannel(233, 'Future International', 4, 'General'))
new TVChannel(781, 'Kairali Channel', 6, 'General'))
new TVChannel(292, 'Rotana Clip', 2, 'Arabia'))
new TVChannel(210, 'Adala TV', 8, 'General'))
new TVChannel(778, 'PTV Global', 2, 'General'))
new TVChannel(320, 'Tiji', 8, 'Kids'))
new TVChannel(294, 'M+', 1, 'Music'))
new TVChannel(466, 'Travel XP 4k', 4, '4K'))
new TVChannel(313, 'Cartoon Network', 1, 'Kids'))
new TVChannel(166, 'Iqraa', 1, 'Arabia'))
new TVChannel(579, 'Turner Classic Movies', 5, 'Movies'))
new TVChannel(356, 'France 24', 3, 'News'))
new TVChannel(365, 'Russia Today', 5, 'News'))
new TVChannel(853, 'Zee Aflam', 7, 'Movies'))
*/



const { TVChannel, ChannelManager } = require("./tvchannels")

const manager = new ChannelManager()
manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'))
manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'))
manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'))
manager.subscribeChannel(365)
manager.subscribeChannel(294)
manager.countSubcribedChannels()
console.log(manager.totalSubscribedCost())

