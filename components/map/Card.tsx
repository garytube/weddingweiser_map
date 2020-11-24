import React from 'react';
import { CardProps } from '../sidebar/Sidebar';


export const Card = (props: CardProps) => (
  <aside className=" mx-4 my-8 mt-4 flex" onClick={props.onClick}>
    <img width={120} className="rounded-xl" height={100} src={props.thumbnail} alt={props.title} />
    <div className="pl-2 flex items-start flex-col">
      <div className="text-gray-800 text-lg font-medium mb-1 leading-snug">{props.title}</div>
      <div className="text-gray-400 text-sm mb-3">Veröffentlicht am {props.date}</div>
      <p>{props.id}</p>
      <div className="block mt-3 sm:mt-0">
        <a href={props.post_url} target="_blank" rel="noopener noreferrer" className="w-full transition-all flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-gray-100 hover:bg-gray-300 hover:text-gray-800 md:py-1  md:px-2 uppercase tracking-wide">
          Beitrag lesen
          </a>
      </div>
    </div>
  </aside>
);
