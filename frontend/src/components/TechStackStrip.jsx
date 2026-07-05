import React from 'react';
import './TechStackStrip.css';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const STACK = [
  { name: 'React',       icon: `${DEVICON}/react/react-original.svg` },
  { name: 'Next.js',     icon: `${DEVICON}/nextjs/nextjs-plain.svg` },
  { name: 'Flutter',     icon: `${DEVICON}/flutter/flutter-original.svg` },
  { name: 'Python',      icon: `${DEVICON}/python/python-original.svg` },
  { name: 'Node.js',     icon: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: 'Docker',      icon: `${DEVICON}/docker/docker-original.svg` },
  { name: 'MongoDB',     icon: `${DEVICON}/mongodb/mongodb-original.svg` },
  { name: 'PostgreSQL',  icon: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: 'AWS',         icon: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { name: 'Azure',       icon: `${DEVICON}/azure/azure-original.svg` },
  { name: 'TensorFlow',  icon: `${DEVICON}/tensorflow/tensorflow-original.svg` },
  { name: 'Redis',       icon: `${DEVICON}/redis/redis-original.svg` },
  { name: 'Firebase',    icon: `${DEVICON}/firebase/firebase-original.svg` },
  { name: 'Kubernetes',  icon: `${DEVICON}/kubernetes/kubernetes-original.svg` },
  { name: 'GraphQL',     icon: `${DEVICON}/graphql/graphql-plain.svg` },
  { name: 'TypeScript',  icon: `${DEVICON}/typescript/typescript-original.svg` },
];

const TechStackStrip = () => {
  const items = [...STACK, ...STACK];

  return (
    <section
      className="tech-strip"
      aria-label="Technology stack"
    >
      <div className="tech-strip__fade tech-strip__fade--left" />
      <div className="tech-strip__fade tech-strip__fade--right" />

      <div className="tech-strip__track">
        {[0, 1].map(trackIdx => (
          <div key={trackIdx} className="tech-strip__scroll" aria-hidden="true">
            {items.map((tech, i) => (
              <span key={`${trackIdx}-${i}`} className="tech-strip__item">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="tech-strip__icon"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                {tech.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackStrip;
