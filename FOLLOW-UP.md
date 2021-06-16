# 1. What libraries did you add? What are they used for?

better-scroll: for pulling down to refresh in list.

axios: HTTP request.

ramda: It is a functional programming lib. It does similar things to Lodash, but it is easier to organize tasks into pipelines.

vuetify: an UI framework.

# 2. If you had more time, what further improvements or new features would you add ?

May add weather or city pictures and some animations.

# 3. Which parts are you most proud of? And why?

During the development process, I enjoyed the process of manipulating data and it went smoothly. I think some of my methods of manipulating data look good, such as the use of functions like map, filter, reduce, and forEach. In addition, most of the methods I encapsulate are only a few lines, which makes me feel good.

# 4. Which parts did you spend the most time with? What did you find most difficult?

I have spent a long time in 3 places

1. I spent some time trying different layouts and color combinations.Because of the lack of design drafts and you want it to be beautiful.
2. When doing the pull-down refresh function, I spent some time looking for a more suitable third-party library. I used iscroll at first but it needed to encapsulate a very large component with many properties. It is not an efficient way. So I finally found a new one, which can be used after simple processing.
3. It took some time to write the test code. One error seems to be that nuxtjs often happens when working with vuetify. I still haven't gotten it right now, I may still need to read some posts.

# 5. How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.

The endpoint provided in the test does not add CORS configuration, so when the client requests it, the browser will throw an error. But I'm not sure if you did it intentionally.
