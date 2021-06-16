<template>
    <div class="pulldown">
        <div class="pulldown-bswrapper" ref="bsWrapper">
            <div class="pulldown-scroller">
                <div class="pulldown-wrapper">
                    <div v-show="beforePullDown">
                        <span>Pull Down and refresh</span>
                    </div>
                    <div v-show="!beforePullDown">
                        <div v-show="isPullingDown">
                            <span>Loading...</span>
                        </div>
                        <div v-show="!isPullingDown">
                            <span>Refresh success</span>
                        </div>
                    </div>
                </div>
                <!-- default slot for body content -->
                <slot></slot>

                <div class="pullup-tips">
                    <div v-if="!isPullUpLoad" class="before-trigger">
                        <span class="pullup-txt">Pull up and load more</span>
                    </div>
                    <div v-else class="after-trigger">
                        <span class="pullup-txt">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';

BScroll.use(PullDown);
BScroll.use(Pullup);

const TIME_BOUNCE = 800;
const THRESHOLD = 70;
const STOP = 56;

export default {
    props: {
        pullDownHandle: {
            type: Function,
            default: () => {},
        },
        pullUpHandle: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        return {
            beforePullDown: true,
            isPullingDown: false,
            isPullUpLoad: false,
        };
    },
    mounted() {
        this.initBscroll();
    },
    methods: {
        initBscroll() {
            this.bscroll = new BScroll(this.$refs.bsWrapper, {
                scrollY: true,
                bounceTime: TIME_BOUNCE,
                useTransition: false,
                pullUpLoad: true,
                pullDownRefresh: {
                    threshold: THRESHOLD,
                    stop: STOP,
                },
                click: true,
                tap: true,
            });

            this.bscroll.on('pullingDown', this.pullingDownHandler);
            this.bscroll.on('pullingUp', this.pullingUpHandler);
        },
        async pullingUpHandler() {
            this.isPullUpLoad = true;

            await this.pullUpHandle();

            // Mock requesting more data
            setTimeout(() => {
                this.bscroll.finishPullUp();
                this.bscroll.refresh();
                this.isPullUpLoad = false;
            }, 3000);
        },
        async pullingDownHandler() {
            this.beforePullDown = false;
            this.isPullingDown = true;

            await this.pullDownHandle();

            this.isPullingDown = false;
            this.finishPullDown();
        },
        async finishPullDown() {
            this.bscroll.finishPullDown();
            setTimeout(() => {
                this.beforePullDown = true;
                this.bscroll.refresh();
            }, TIME_BOUNCE + 100);
        },
    },
};
</script>

<style lang="scss" scoped>
.pulldown {
    height: 100%;
}
.pulldown-bswrapper {
    position: relative;
    height: 100%;
    overflow: hidden;
}
.pulldown-wrapper {
    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    transform: translateY(-100%) translateZ(0);
    text-align: center;
    color: #999;
}
.pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
}
</style>
