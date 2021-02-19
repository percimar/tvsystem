const { test, expect, describe } = require("@jest/globals")
const { TVChannel, ChannelManager } = require("./tvchannels")

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

test('Subscribed count starts at 0', () => {
    const manager = new ChannelManager();
    expect(manager.countSubcribedChannels()).toBe(0);
    manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
    manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
    manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));
    expect(manager.countSubcribedChannels()).toBe(0);
})

test('Adding channels increments subscribed count', () => {
    const manager = new ChannelManager();
    manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
    manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
    manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));
    manager.subscribeChannel(294);
    expect(manager.countSubcribedChannels()).toBe(1);
    manager.subscribeChannel(853);
    manager.subscribeChannel(365);
    expect(manager.countSubcribedChannels()).toBe(3);
})

test('Unsubscribing properly decrements subscribed count', () => {
    const manager = new ChannelManager();
    manager.unsubscribeChannel(294);
    manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'));
    manager.addChannel(new TVChannel(853, 'Zee Aflam', 7, 'Movies'));
    manager.addChannel(new TVChannel(365, 'Russia Today', 5, 'News'));
    manager.unsubscribeChannel(294);
    expect(manager.countSubcribedChannels()).toBe(0);
    manager.subscribeChannel(294);
    manager.subscribeChannel(853);
    manager.subscribeChannel(365);
    manager.unsubscribeChannel(294);
    expect(manager.countSubcribedChannels()).toBe(2);
    manager.unsubscribeChannel(853);
    manager.unsubscribeChannel(365);
    expect(manager.countSubcribedChannels()).toBe(0);

    describe('Retrieve Tests', () => {

        test('Get Channel', () => {
            let manager = new ChannelManager()
            manager.addChannel(new TVChannel(294, 'M+', 1, 'Music'))
            let result = manager.getChannel(294)
            expect(result.channel).toBe(294)
        })

        test('Get Non-existent Channel', () => {
            let manager = new ChannelManager()
            let result = manager.getChannel(99999999)
            expect(result).toBe(undefined)
        })

    })