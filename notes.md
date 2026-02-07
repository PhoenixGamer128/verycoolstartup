# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 52.73.68.210
Command to ssh:
ssh -i ~/Desktop/"BYU 125"/"CS 260"/vitoria.pem ubuntu@52.73.68.210
I would like to remember how to set up a server, or at least remember the basics so that in the future I can do my own startup if I do out outside this course.

## Caddy

1/17/2026:
No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

I would like to remember how to make all the simple HTML elements. HTML seems very simple, you put things where you want them, and it shows up exactly the way you wrote it, making it very intuitive for how the structure will look like.
I learned how to deploy a project from a directory, specifically using the deployFiles.sh file for caddy.

## CSS

This took a couple hours to get it how I wanted. I really anjoy having responsive designs and would like to use @media. Tried to put a sidebar for some tasks, but the @media styling wasn't working. Learned many CSS "code"

I did like the navbar it made it super easy to build a responsive header.

I added several ways for overflow and wrapping to occur to make it pleasing to the eye.


## React Part 1: Routing

Learning to port my CSS deliverable to React was a bit of work, especially at the beginning when I was figuring out what keywords I was using. I also noticed that pure HTML has more leniency than JSX, I forgot to end all my inputs with '/>', something that HTML ignored, so I'm glad I figured it out in the end! I had a bit of trouble because of conflicting CSS, but it was because of some class naming conventions I changed to fit with React.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
