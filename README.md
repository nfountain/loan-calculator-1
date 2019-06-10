# Loan Calculator

This is a quick project to practice using JavaScript to create a calculator and add some functionality and change the styles based on User Interaction.

## Credits

This project was created as a part of a [Traversy Media JavaScript course](https://www.udemy.com/modern-javascript-from-the-beginning/).

## Adjustments

My JS provides the same functionality, but has a few differences. As I would work on a function, and then check to see if I ended up with the functionality that I was looking for, all bugs and errors are my own.

## Learning

As a part of learning how to fine-tune JavaScript, I looked for things that did not behave as expected.

Some things that were found and addressed include:

1. The calculator appeared to be processing before, during and after alerts. This was due to the loading gif showing up before the alert popped up, and the gif remained showing, even while the alert was displayed. To resolve this, I added a call to the function that hides the gif when the function to show the alert is called.

2. Multiple alerts were showing if the button was clicked more than once, as they were being added dynamically using JavaScript when submit was triggered if on of the entry boxes was empty. This was remedied by extracting the block of code that creates the message into its own function, and then calling that function if there is not already an alert present.
