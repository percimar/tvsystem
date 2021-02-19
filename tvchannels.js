class TVChannel {
    constructor(chNum, name, price, category) {
        this.channel = chNum
        this.name = name
        this.price = price
        this.category = category
    }
}

class DuplicateChannelException extends Error {
    constructor(message) {
        super(message)
        this.name = 'DuplicateChannelException'
    }
}

class ChannelNotFoundException extends Error {
    constructor(message) {
        super(message)
        this.name = 'ChannelNotFoundException'
    }
}

class NoSubscribedChannelsException extends Error {
    constructor(message) {
        super(message)
        this.name = 'NoSubscribedChannelsException'
    }
}

class ChannelManager {
    #allChannels
    #subscribedChannels
    constructor() {
        this.#allChannels = []
        this.#subscribedChannels = []
    }

    // Add a new channel to the management system.  If a channel already exists with the
    // same channel number this method will throw a DuplicateChannelException.
    addChannel(ch) {
        let foundChannel = this.#allChannels.find((x) => x.channel == ch.channel)
        if (foundChannel) {
            throw new DuplicateChannelException(`DuplicateChannelException: Adding Channel ${ch.channel}`)
        }
        this.#allChannels.push(ch)
    }

    // Remove a channel from the management system.  If the channel does not exist, the
    // method will throw a ChannelNotFound exception.
    deleteChannel(chNum) {
        const foundChannel = this.#allChannels.find((x) => x.channel == chNum);
        if (!foundChannel) {
            throw new ChannelNotFoundException(`ChannelNotFoundException: Removing channel ${chNum}`);
        }
        this.#allChannels = this.#allChannels.filter((ch) => ch.channel !== chNum);
    }

    // Returns the number of channels.
    countChannels() {
        return this.#allChannels.length
    }

    // Returns a copy of the TV channel with the given channel number.  Notice that it does not
    // return the actual object!  If you get a channel and change information about it (say its name) and
    // ask again for the same TV channel, you will not see the change that you just made.  If the
    // channel does not exist you will get back undefined.
    getChannel(chNum) {
        const foundChannel = this.#allChannels.find((x) => x.channel == chNum);
        if (!foundChannel) {
            return undefined;
        }
        return { ...foundChannel };
    }

    // Add the channel number to the subscriptions.  The function returns true if
    // the operation was successful and false if the channel was already subscribed.
    // No exception is thrown.
    subscribeChannel(chNum) {
        const foundChannel = this.#allChannels.find((x) => x.channel == chNum);
        const foundSubChannel = this.#subscribedChannels.find((x) => x.channel == chNum);
        if (!foundChannel || foundSubChannel) {
            return false
        }
        this.#subscribedChannels.push(foundChannel)
        return true
    }

    // Unsubscribe from the channel.  If the channel is not currently subscribed this
    // operation is ignored.
    unsubscribeChannel(chNum) {
        const foundChannel = this.#subscribedChannels.find((x) => x.channel == chNum);
        if (foundChannel) {
            this.#subscribedChannels = this.#subscribedChannels.filter(item => item.channel !== foundChannel.channel);
        }
    }

    // Return the number of currently subscribed channels
    countSubcribedChannels() {
        return this.#subscribedChannels.length;
    }

    // Return the cost (total) of all currently subscribed channels
    totalSubscribedCost() {
        return this.#subscribedChannels.reduce((sum, ch) => sum += ch.price, 0);
    }

    // Returns the next subscribed channel (in order).  Suppose you are
    // subscribed to the channels [3, 6, 7, 10] and you ask for what comes next after channel 7,
    // you chould get a response of 10.  If you ask what comes next after 10, you would get 3.
    // If there are no currently subscribed channels, this function will throw the exception
    // NoSubscribedChannels.
    nextSubscribedChannel(currentCh) {
        const foundChannel = this.#allChannels.find((x) => x.channel == currentCh);
        if (!foundChannel) {
            throw new ChannelNotFoundException(`ChannelNotFoundException: There is no channel with this number`);
        }
        if (this.#subscribedChannels.length === 0) {
            throw new NoSubscribedChannelsException(`NoSubscribedChannelsException: You have not subscribed to any channels`);
        }
        else {
            const nextChannel = () => {
                let sorted = this.#subscribedChannels.sort((a, b) => (a.channel > b.channel) ? 1 : -1)
                let x = sorted.indexOf(foundChannel) + 1
                if (x >= this.#subscribedChannels.length) {
                    x = 0
                }
                console.log(this.#subscribedChannels.length)
                return (sorted[x])
            }
            const next = nextChannel();
            return ({ ...next })
        }
    }

    // Returns the previous subscribed channel (in order).  Suppose you are
    // subscribed to the channels [3, 6, 7, 10] and you ask for what comes before channel 7,
    // you chould get a response of 6.  If you ask what comes before 3, you would get 10.
    // If there are no currently subscribed channels, this function will throw the exception
    // NoSubscribedChannels.
    previousSubscribedChannel(currentCh) {
        const foundChannel = this.#allChannels.find((x) => x.channel == currentCh);
        if (!foundChannel) {
            throw new ChannelNotFoundException(`ChannelNotFoundException: There is no channel with this number`);
        }
        if (this.#subscribedChannels.length === 0) {
            throw new NoSubscribedChannelsException(`NoSubscribedChannelsException: You have not subscribed to any channels`);
        }
        else {
            const prevChannel = () => {
                let sorted = this.#subscribedChannels.sort((a, b) => (a.channel > b.channel) ? 1 : -1)
                let x = sorted.indexOf(foundChannel) - 1
                if (x < 0) {
                    x = this.#subscribedChannels.length - 1
                }
                return (sorted[x])
            }
            const prev = prevChannel();
            return ({ ...prev })
        }
    }

}

module.exports = {
    TVChannel,
    ChannelManager
}



