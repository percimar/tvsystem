const { test, expect, describe } = require("@jest/globals")
const { TVChannel, ChannelManager } = require("./tvchannels")

describe("countChannels(), addChannel() and deleteChannel() tests", () => {

    test('Initializing Channel Manager', () => {
        const manager = new ChannelManager();
        const count = manager.countChannels();
        expect(count).toBe(0);
    })

    test('Adding channels increases count', () => {
        const manager = new ChannelManager();
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
        manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));
        const count = manager.countChannels();
        expect(count).toBe(3);
    })

    test('Adding duplicate channels throws DuplicateChannelException', () => {
        const manager = new ChannelManager();
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        expect(() => manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'))).toThrow("DuplicateChannelException");
    })


    test('Delete channel reduces channel count', () => {
        const manager = new ChannelManager();
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        manager.deleteChannel(294);
        expect(manager.countChannels()).toBe(0);
    })

    test('Deleting non-existing channel throws ChannelNotFoundException', () => {
        const manager = new ChannelManager();
        expect(() => manager.deleteChannel(295)).toThrow("ChannelNotFoundException");
    })

})

describe('getChannel() Tests', () => {

    test('Get channel returns TVChannel', () => {
        const manager = new ChannelManager();
        const channel = new TVChannel(853, 'Zee Aflam', 7, 'Movies');
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'))
        manager.addChannel(channel);
        expect(manager.getChannel(853)).toMatchObject({ ...channel });
    })

    test('Get channel return value does not mutate', () => {
        const manager = new ChannelManager();
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
        manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));
        const returnedCh = manager.getChannel(294);
        returnedCh.name = "NAME CHANGED HAHA";
        const baseCh = manager.getChannel(294);
        expect(baseCh.name).toBe("M+");
    })

    test('Get channel returns undefined if not exists', () => {
        const manager = new ChannelManager();
        expect(manager.getChannel(1)).toBe(undefined);
    })

})

describe('subscribeChannel() Tests', () => {

    test('Subscribing to channel returns true', () => {
        const manager = new ChannelManager();
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        expect(manager.subscribeChannel(294)).toBe(true);
    })

    test('Subscribing to subscribed channel returns false', () => {
        const manager = new ChannelManager();
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        manager.subscribeChannel(294);
        expect(manager.subscribeChannel(294)).toBe(false);
    })

    test('Subscribing to non-existing channel returns false', () => {
        const manager = new ChannelManager();
        expect(manager.subscribeChannel(1)).toBe(false);
    })

})

describe('unsubscribeChannel() Tests', () => {

    test('Unsubscribing from subscribed channel', () => {
        const manager = new ChannelManager();
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
        manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));

        manager.subscribeChannel(294);
        manager.subscribeChannel(853);
        manager.subscribeChannel(365);

        expect(manager.unsubscribeChannel(294)).toBeUndefined();
        expect(manager.countSubcribedChannels()).toBe(2);
        expect(manager.totalSubscribedCost()).toBe(12);
    })

    test('Unsubscribing from not subscribed channels does not throw error', () => {
        const manager = new ChannelManager();
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
        manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));

        expect(manager.unsubscribeChannel(294)).toBeUndefined();
        expect(() => manager.unsubscribeChannel(294)).not.toThrow();
    })

})

describe('nextSubscribedChannel() Tests', () => {

    test('Next Subscribed Channel Check', () => {
        let manager = new ChannelManager()
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
        manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));
        manager.subscribeChannel(294)
        manager.subscribeChannel(853)
        manager.subscribeChannel(365)
        expect(manager.nextSubscribedChannel(853).channel).toBe(365);
    })

    test('Next Non-existent Subscribed Channel Check', () => {
        let manager = new ChannelManager()
        manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
        expect(manager.nextSubscribedChannel(853).channel).toThrow("NoSubscribedChannels")
    })

    test('Next Unsubscribed Channel Check', () => {
        let manager = new ChannelManager()
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
        manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));
        manager.subscribeChannel(294)
        manager.subscribeChannel(853)
        manager.subscribeChannel(365)
        manager.unsubscribeChannel(853)
        expect(manager.nextSubscribedChannel(294).channel).toBe(365);
    })

})

describe('prevSubscribedChannel() Tests', () => {

    test('Previous Subscribed Channel Check', () => {
        let manager = new ChannelManager()
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
        manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));
        manager.subscribeChannel(294)
        manager.subscribeChannel(853)
        manager.subscribeChannel(365)
        expect(manager.nextSubscribedChannel(853).channel).toBe(294);
    })

    test('Previouse Non-existent Subscribed Channel Check', () => {
        let manager = new ChannelManager()
        manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
        expect(manager.previousSubscribedChannel(853).channel).toThrow("NoSubscribedChannels")
    })

    test('Previous Unsubscribed Channel Check', () => {
        let manager = new ChannelManager()
        manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
        manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
        manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));
        manager.subscribeChannel(294)
        manager.subscribeChannel(853)
        manager.subscribeChannel(365)
        manager.unsubscribeChannel(853)
        expect(manager.nextSubscribedChannel(365).channel).toBe(294);
    })

})
