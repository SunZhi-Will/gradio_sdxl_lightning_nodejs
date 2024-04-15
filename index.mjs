import { client } from "@gradio/client";
import { createRequire } from "module";
import { JSDOM } from 'jsdom';


export default async function generate_image(text, step = '4-Step') {
	console.log('test')

	const require = createRequire(import.meta.url);
	global.EventSource = require('eventsource');
	// 創建一個虛擬的 DOM 
	// app.js
	const { window } = new JSDOM('<!DOCTYPE html>');
	global.window = window;


	const app = await client("ByteDance/SDXL-Lightning");
	const result = await app.predict("/generate_image", [		
			text, // string  in 'Enter your prompt (English)' Textbox component		
			step, // string  in 'Select inference steps' Dropdown component
		]);

	console.log(result.data);
	return result.data;
}
