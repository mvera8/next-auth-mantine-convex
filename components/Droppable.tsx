import { useDroppable } from '@dnd-kit/react';

export default function Droppable({ id, children }: { id: string, children: React.ReactNode }) {
    const { ref } = useDroppable({
        id,
    });

    return (
        <div ref={ref} style={{ width: 300, height: 300, border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {children}
        </div>
    );
}