# bootstrap-banner-message

A banner message library to display site-wide messages during a specified time period. 

Dismissed messages are cached as dismissed so visitors do not have to keep seeing the same messages.

## Dependencies

Made to work with [Bootstrap 4](https://getbootstrap.com/), [jQuery 3](https://jquery.com/).

```html
<!-- Load before the bannerMessages.js is loaded. -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
```

## Install

Include JavaScript and CSS resources where appropriate:

```html
<link rel="stylesheet" href="css/bannerMessages.css">
<script src="bannerMessages.js"></script>
```

In the `DOM` include a `<div>` where you want to append the messages. 

I usually put it as the first child below the `body` tag. I include the `hide` so the `div` does not display if there are no messages.


```html
<div class="site-messages hide"></div>
```

Then instantiate a `BannerMessage` object.

```javascript
var banners = new BannerMessages({
      messages: messages,
      target: 'site-messages'
});
```

## Message Data Structure

```javascript
var messages = [
    {
        id: 1,
        title: 'Check out our <a href="#" target="_blank">new site</a>',
        message: 'We are redesigning our current website with you in mind. The new website will present you with a more engaging story about the SEI and its work. We invite you to check out the <a href="#" target="_blank">new site</a> and <a href="#">give us feedback</a>.',
        cssClass: "success",
        ctaText: 'Find Out More',
        ctaLink: 'https://www.google.com',
        active: true,
        timeStart: 'Dec 20, 2017 17:12:00',
        timeUpdated: 'Dec 23, 2017 6:32:00',
        timeEnd: 'Dec 25, 2017 17:17:00',
        hidden: false
    }
];
```

### `cssClass`

Available choices are currently `success` or `danger`.

### `active`

The `active` flag will not show a message.

### `hidden`

The `hidden` flag designates whether to hide the message. This is also the data point toggled by a visitor if they dismiss the message.
