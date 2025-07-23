## CREATE

```js
siner = 0;
alpha = 0.2;
xstretch = 1;
ystretch = 1;
o_insurance = 0;
depth = 4 + instance_number(object_index);
OBSPEED = 0.02;
// b_insurance = 0;
b_insurance = -0.2;
```

## STEP

```js
siner += 1;

if (OBSPEED > 0)
    alpha = sin(siner / 34) * 0.2;

ystretch += OBSPEED;
xstretch += OBSPEED;

if (b_insurance < 0)
    b_insurance += 0.01;

if (ystretch > 2)
{
    o_insurance += 0.01;
    
    if (o_insurance >= 0.5)
        instance_destroy();
}
```

## DRAW

`draw_sprite_ext(sprite_index, image_index, x, y, image_xscale, image_yscale, image_angle, image_blend, image_alpha);`

```js
if (siner > 2)
{
    draw_background_ext(IMAGE_DEPTH, 160, 120, 1 + xstretch, 1 + ystretch, 0, image_blend, ((0.2 + alpha) - o_insurance) + b_insurance);
    draw_background_ext(IMAGE_DEPTH, 160, 120, -1 - xstretch, 1 + ystretch, 0, image_blend, ((0.2 + alpha) - o_insurance) + b_insurance);
    draw_background_ext(IMAGE_DEPTH, 160, 120, -1 - xstretch, -1 - ystretch, 0, image_blend, ((0.2 + alpha) - o_insurance) + b_insurance);
    draw_background_ext(IMAGE_DEPTH, 160, 120, 1 + xstretch, -1 - ystretch, 0, image_blend, ((0.2 + alpha) - o_insurance) + b_insurance);
}
```

calls:

| sprite      | x   | y   | xscale        | yscale        | rot | colour      | alpha                                       |
| IMAGE_DEPTH | 160 | 120 | 1 + xstretch  | 1 + ystretch  | 0   | image_blend | ((0.2 + alpha) - o_insurance) + b_insurance |
| IMAGE_DEPTH | 160 | 120 | -1 - xstretch | 1 + ystretch  | 0   | image_blend | ((0.2 + alpha) - o_insurance) + b_insurance |
| IMAGE_DEPTH | 160 | 120 | -1 - xstretch | -1 - ystretch | 0   | image_blend | ((0.2 + alpha) - o_insurance) + b_insurance |
| IMAGE_DEPTH | 160 | 120 | 1 + xstretch  | -1 - ystretch | 0   | image_blend | ((0.2 + alpha) - o_insurance) + b_insurance |

## creation

```js
if (OBMADE == 1)
{
    OB_DEPTH += 1;
    obacktimer += OBM;
    
    if (obacktimer >= 20)
    {
        DV = instance_create(0, 0, DEVICE_OBACK_4);
        DV.depth = 5 + OB_DEPTH;
        DV.OBSPEED = 0.01 * OBM;
        
        if (OB_DEPTH >= 60000)
            OB_DEPTH = 0;
        
        obacktimer = 0;
    }
}
```


