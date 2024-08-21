"use client"
import { Button } from '@/components/ui/button'
import { useState } from 'react'

type DeleteBtnProps = {
    ticketId: string; 
  };
  


const DeleteBtn = ({ params }: { params: { ticketid: string } }) => {
  
    const [deleting, setDeleting] = useState(false)
    const ticketId =  params.ticketid;
    console.log(ticketId, " ticket id")
    const deleteTicket = async () => {

      setDeleting(true);

        try {

            const response = await fetch(`/api/tickets/${ticketId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },

              });
              if (!response.ok) {
                throw new Error('Failed to delete ticket');
              }
        
              const result = await response.json();
              console.log('Delete response:', result);
        
              window.location.href =  "/"
              
        }
        catch (error) {
            console.error('Error deleting ticket:', error);
        }
        
        finally {
              setDeleting(false); 
            }        
    }

  return (
    <Button onClick={deleteTicket} disabled={deleting} className='mx-8'>Delete</Button>
  )
}

export default DeleteBtn
