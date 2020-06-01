import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
} from '@angular/animations';

export const transAnimation = animation([
    style({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
]);

// Routable animations
export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-10%', opacity: 0 })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('500ms ease-out', style({ left: '10%', opacity: 0 }))
                ]),
                query(':enter', [
                    animate('500ms ease-out', style({ left: '0%', opacity: 1 }))
                ])
            ]),
            query(':enter', animateChild()),
        ])
    ]);
