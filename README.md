# html-dom-lens extension

A chrome extension to view element information without Developer Tools.

## Platforms
Chrome Store: https://chrome.google.com/webstore/detail/html-dom-lens-extension/kgdineinlghhbncabemgfaopoaggbmeg

## Getting Started

### For Development 

1. Go to `react-client` folder
2. Once there, run the following command: `yarn`. This will install all the dependencies needed. Make sure your node version is at least 16 and above.
3. Run the command: `yarn web:dev`. This will run the localhost and create a dummy environment to simulate the browser extension in localhost

Note: If you encountered issues related to CORS during development, you may need a CORS extension to bypass the CORS API validation using this extension if you're using chrome: https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf

### For Production / Chrome web store

Follow these steps to push changes and upload the files needed for chrome extension:

1. Go to `react-client` folder
2. Run `yarn build:prod`. This will create a production build (Located in `code-ext/chrome/dist` folder) for you along with running the bundle analyzer
3. You can now use the build files to upload the updates to your chrome extension!


## Folder Structure

### Components

Contains all the components that are used for the application

<details><summary><b>Component Structure</b></summary>

  1. DomInfoDialogBox - This contains the main body of the application 

  2. DomInfo - Stores components that display the information related to the selected DOM 
     this is currently divided into 5 parts according to grouping.  
      The grouped information are as follows : <br />
        i. selected element basic information are in DomDetails.js <br />
        ii. selected element data attributes list are in AttributeDetails.js <br />
        iii. list selected element's children are in ChildDetails.js <br />
        iv. id and class of selected element's parent are in ParentDetails.js <br />

  3. Panel - represents modals outside of the main dialog box that support the functions for the application
      The panels so far are as follows : <br />
        i. Bookmark Panel for the user to input the bookmark name <br />
        ii. Annotation Panel for the user to add annotation for selected element <br />

  4. Widget - contains part of the application that are doing functions outside the main dialog box 
     but still does the task within the scope of the application
      Current Widgets so far are as follows: <br />
        i. Bookmark Store Folder contains the entire bookmark store widget where bookmarks are saved <br />
        ii. DOMOptions.js contains container for the different button options beside the main dialog box <br />
        iii. DOMMinimalDetailsWidget.js contains the minimal display for hovered element <br />
  
  5. Shared - this folder contains all the block of codes that are being reused or could be reused for the entire project 
       The current status are as follows: <br />
        i. Button folder holds all buttons that are being used multiple times or could be used multiple times in the application
        examples of this are CloseButton.js or OptionButton.js <br />
        ii. Input folder holds the block of code for inputs that are already customized according to the design of the application 
        currently being used on bookmarkpanel but could be reused when another need occurs to maintain uniformity. <br />
        iii. Modal folder contains the main standard modal for the application outside main dialog box to be reused when necessary to maintain uniformity currently being used on annotation panel and bookmark panel <br />
</details>

### Hooks 

Contains custom hooks that are being could be used within the app when necessary

<details><summary><b>Hooks Structure</b></summary>

  1. useDraggable.js is the custom hooked used to make a component draggable this is currently being used on the main dialog box 
  but could still be used on other components if deemed necessary.

  2. useLocalStorage.js is used to store information into local storage
</details>

## Store 

Stores all context or necessary global states
<details><summary><b>Store Structure</b></summary>

  1. global-context.js - currently being used for to monitor change of states of bookmark

</details>

## Utils

This folder is intended for the helper functions that are constantly being used 
