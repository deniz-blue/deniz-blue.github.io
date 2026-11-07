import type { PeekingAvatarAnimations } from "~/avatar/types";

export const PEEKING_AVATAR_ANIMATIONS: PeekingAvatarAnimations = {
	"lookHorizontal": {
		"length": 1,
		"bones": {
			"LeftIris": [
				{
					"time": 0,
					"position": [
						0.25,
						0,
						0
					],
					"smooth": false
				},
				{
					"time": 0.5,
					"position": [
						0,
						0,
						0
					],
					"smooth": false
				},
				{
					"time": 1,
					"position": [
						-1,
						0,
						0
					],
					"smooth": false
				}
			],
			"RightIris": [
				{
					"time": 0,
					"position": [
						1,
						0,
						0
					],
					"smooth": false
				},
				{
					"time": 0.5,
					"position": [
						0,
						0,
						0
					],
					"smooth": false
				},
				{
					"time": 1,
					"position": [
						-0.25,
						0,
						0
					],
					"smooth": false
				}
			]
		}
	},
	"lookVertical": {
		"length": 1,
		"bones": {
			"LeftIris": [
				{
					"time": 0,
					"position": [
						0,
						0.5,
						0
					],
					"smooth": false
				},
				{
					"time": 0.5,
					"position": [
						0,
						0,
						0
					],
					"smooth": false
				},
				{
					"time": 1,
					"position": [
						0,
						-1,
						0
					],
					"smooth": false
				}
			],
			"RightIris": [
				{
					"time": 0,
					"position": [
						0,
						0.5,
						0
					],
					"smooth": false
				},
				{
					"time": 0.5,
					"position": [
						0,
						0,
						0
					],
					"smooth": false
				},
				{
					"time": 1,
					"position": [
						0,
						-1,
						0
					],
					"smooth": false
				}
			]
		}
	},
	"blink": {
		"length": 0.25,
		"bones": {
			"Eyelids": [
				{
					"time": 0,
					"position": [
						0,
						0,
						0
					],
					"smooth": true
				},
				{
					"time": 0.08333,
					"position": [
						0,
						-1.3,
						0
					],
					"smooth": true
				},
				{
					"time": 0.16667,
					"position": [
						0,
						-1.3,
						0
					],
					"smooth": true
				},
				{
					"time": 0.25,
					"position": [
						0,
						0,
						0
					],
					"smooth": true
				}
			]
		}
	}
};
