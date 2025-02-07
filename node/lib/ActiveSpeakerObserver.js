"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveSpeakerObserver = void 0;
const Logger_1 = require("./Logger");
const RtpObserver_1 = require("./RtpObserver");
const logger = new Logger_1.Logger('ActiveSpeakerObserver');
class ActiveSpeakerObserver extends RtpObserver_1.RtpObserver {
    /**
     * @private
     */
    constructor(options) {
        super(options);
        this.handleWorkerNotifications();
    }
    /**
     * Observer.
     */
    get observer() {
        return super.observer;
    }
    handleWorkerNotifications() {
        this.channel.on(this.internal.rtpObserverId, (event, data) => {
            switch (event) {
                case 'dominantspeaker':
                    {
                        const producer = this.getProducerById(data.producerId);
                        if (!producer)
                            break;
                        const dominantSpeaker = {
                            producer
                        };
                        this.safeEmit('dominantspeaker', dominantSpeaker);
                        this.observer.safeEmit('dominantspeaker', dominantSpeaker);
                        break;
                    }
                default:
                    {
                        logger.error('ignoring unknown event "%s"', event);
                    }
            }
        });
    }
}
exports.ActiveSpeakerObserver = ActiveSpeakerObserver;
