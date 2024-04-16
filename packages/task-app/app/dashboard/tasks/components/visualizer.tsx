import React, { useState } from 'react';

type contextNames = 'customer' | 'market' | 'people' | 'financial' | 'report';
type target = {
  ubication: string;
  context: contextNames | string;
}

interface Visualizer {
}

function Visualizer() {
  const [ visualizerData, setVisualizerData ] = useState<Visualizer>();

  interface IObjetiveVisualizer {
    metrics: { id: string, name: string }[];
    action: string;
    unity: string;
    description: string;
    target: target; 
    progress: number;
  }

  function ObjetiveVisualizer() {
    const [ objetiveData, setObjetiveData ] = useState<IObjetiveVisualizer | null>(null);

    

    return (
      <main>
        
      </main>
    );
  }

  return (
      <div></div>
    )
}

export default Visualizer;
