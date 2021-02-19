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
