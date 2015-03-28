Word Dojo
==========

I'm building a clone of one of my favourite word games, Word Dojo. Found on the Megatouch arcade machine thing, it's a fun game where you string together letters to form words, à la Boggle. 

![Enter the Dojo](http://www.elsaelsa.com/wp-content/uploads/2007/11/word-dojo.jpg)

Built primarily as a learning exercise, the game uses React components and the Flux architecture, a combination which has been working splendidly. High scores are stored remotely in Firebase, and I use Gulp for the build system.

I wrote [a blog post](https://medium.com/@joshuawcomeau/efficient-nested-react-components-dd9347e9b3f3) on some of the things I've learned; I made a few mistakes in it, but there's some solid info in it.

Play Along
===

Clone the repo, run 'npm install' from a terminal to fetch the requisite packages, and then run 'gulp' to build the JS/CSS and launch a development server. A browser should open automatically, but if not you can navigate to 'http://localhost:8000' and see if you can beat my high score.
