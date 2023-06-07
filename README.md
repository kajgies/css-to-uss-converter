
# Css to uss converter for Unity
[Link to page](https://css-to-uss-converter.vercel.app/)
## Warning
This project is a work in progress. There is a lot of trial and error involved gettings this to work properly. I would love to have some contributor that help out. Feel free to open pull requests
## Introduction
This website uses postcss & tailwind in your browser to convert css to uss as good as possible. It uses different postcss plugins in combination with custom postcss code to do this.
## Some backstory
I started work on this to help me make better use of the amazing Unity Asset [OneJS](https://assetstore.unity.com/packages/tools/gui/onejs-221317) (unaffiliated). This asset allows you to write your Unity UI using preact + typescript. 

## Disclaimer
This is still a work in progress and many things will not work. Unity uss and css are also still very different so many things may never work. Be sure to check the [Unity documentation](https://docs.unity3d.com/Manual/UIE-USS.html) if you're wondering what is included and what isn't. This tool is meant to automate part of the progress but it is not a one-stop solution.

## Thanks
- Singtaa for [OneJS](https://assetstore.unity.com/packages/tools/gui/onejs-221317)
- NextJS
- Tailwind
- PostCSS
- mhsdesign for jit-browser-tailwindcss which allows the project to run tailwind as a postcss plugin in the browser
- postcss-css-variables
- postcss-color-converter