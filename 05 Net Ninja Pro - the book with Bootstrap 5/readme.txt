# Project Net Ninja Pro - the book with Bootstrap 5.3.5

# Characteristics:
- Every grid goes into a container;
- Installing Bootstrap via npm;
- Using sass for customization;
    - With SASS, I can define what will be the primary, secondary, info colors, etc. of my project in the minified CSS.
- Using tooltips -->
    - create a tooltip:
        <span class="any_class_except_tooltip" data-bs-placement="top_or_bottom" title="explanation_about_label">
            <i>Bootstrap_Icon</i>
        </span>
    - create a script like this:
        const tooltips = document.querySelectorAll('.tooltp')
        tooltips.forEach(t => {
            new bootstrap.Tooltip(t)

    - script by Bootstrap:
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
})

# Sketch:
    - aria-hidden="true" --> is hidden by default
    - close button by Bootstrap in offcanvas

# html and css made by @NetNinja, available on https://www.youtube.com/watch?v=gwgeMole3gs